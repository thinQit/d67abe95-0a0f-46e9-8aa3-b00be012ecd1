import { NextRequest, NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { adminOrderUpdateSchema } from "@/lib/validators";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await requireAdmin();
    const body = adminOrderUpdateSchema.parse(await req.json());

    const updated = await db.$transaction(async (tx) => {
      const existing = await tx.order.findUnique({
        where: { id: params.id },
        include: { items: true },
      });

      if (!existing) {
        throw new Error("NOT_FOUND");
      }

      const next = await tx.order.update({
        where: { id: params.id },
        data: { status: body.status },
      });

      if (body.status === OrderStatus.CANCELLED && existing.status !== OrderStatus.CANCELLED) {
        for (const item of existing.items) {
          await tx.book.update({
            where: { id: item.bookId },
            data: { stock: { increment: item.quantity } },
          });
        }
      }

      return next;
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === "NOT_FOUND") {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 });
  }
}
