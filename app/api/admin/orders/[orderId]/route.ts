import { NextRequest, NextResponse } from "next/server";
import { UserRole, OrderStatus } from "@prisma/client";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { adminOrderPatchSchema } from "@/lib/validators";

const allowedTransitions: Record<OrderStatus, OrderStatus[]> = {
  pending: [OrderStatus.paid, OrderStatus.cancelled],
  paid: [OrderStatus.fulfilled, OrderStatus.cancelled],
  fulfilled: [],
  cancelled: [],
};

export async function PATCH(req: NextRequest, { params }: { params: { orderId: string } }) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = adminOrderPatchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const existing = await db.order.findUnique({ where: { id: params.orderId } });
    if (!existing) return NextResponse.json({ error: "Order not found" }, { status: 404 });

    if (parsed.data.status && parsed.data.status !== existing.status) {
      const next = parsed.data.status as OrderStatus;
      const allowed = allowedTransitions[existing.status];
      if (!allowed.includes(next)) {
        return NextResponse.json({ error: `Invalid status transition: ${existing.status} -> ${next}` }, { status: 400 });
      }
    }

    const updated = await db.order.update({
      where: { id: params.orderId },
      data: {
        ...(parsed.data.status ? { status: parsed.data.status } : {}),
        ...(parsed.data.fulfillmentNote !== undefined ? { fulfillmentNote: parsed.data.fulfillmentNote } : {}),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
