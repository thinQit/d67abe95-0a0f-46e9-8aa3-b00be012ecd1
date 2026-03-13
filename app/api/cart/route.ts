import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const session = await getAuthSession();

    if (!session?.user?.id) {
      return NextResponse.json({ items: [], totals: { subtotal: 0, tax: 0, shipping: 0, total: 0 } });
    }

    const cart = await db.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: { book: true },
          orderBy: { createdAt: "desc" as const },
        },
      },
    });

    const items = cart?.items ?? [];
    const subtotal = items.reduce((sum, item) => sum + Number(item.book.price) * item.quantity, 0);
    const tax = subtotal * 0.07;
    const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 4.99;
    const total = subtotal + tax + shipping;

    return NextResponse.json({
      items,
      totals: {
        subtotal: Number(subtotal.toFixed(2)),
        tax: Number(tax.toFixed(2)),
        shipping: Number(shipping.toFixed(2)),
        total: Number(total.toFixed(2)),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}
