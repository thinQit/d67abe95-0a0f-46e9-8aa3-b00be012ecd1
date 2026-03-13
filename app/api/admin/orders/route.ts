import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { adminOrdersQuerySchema } from "@/lib/validators";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const parsed = adminOrdersQuerySchema.parse(
      Object.fromEntries(req.nextUrl.searchParams.entries())
    );

    const orders = await db.order.findMany({
      where: {
        AND: [
          parsed.status ? { status: parsed.status } : {},
          parsed.customerEmail ? { shippingEmail: parsed.customerEmail } : {},
        ],
      },
      include: { items: true, user: true },
      orderBy: [{ createdAt: "desc" as const }],
      take: parsed.take + 1,
      ...(parsed.cursor ? { cursor: { id: parsed.cursor }, skip: 1 } : {}),
    });

    const hasMore = orders.length > parsed.take;
    const items = hasMore ? orders.slice(0, parsed.take) : orders;
    const nextCursor = hasMore ? items[items.length - 1]?.id : null;

    return NextResponse.json({ items, nextCursor });
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to fetch admin orders" }, { status: 500 });
  }
}
