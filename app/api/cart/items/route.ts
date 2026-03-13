import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { addCartItemSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const body = addCartItemSchema.parse(await req.json());

    const book = await db.book.findUnique({ where: { id: body.bookId } });
    if (!book) return NextResponse.json({ error: "Book not found" }, { status: 404 });

    const cart =
      (await db.cart.findUnique({ where: { userId: session.user.id } })) ??
      (await db.cart.create({ data: { userId: session.user.id } }));

    const existing = await db.cartItem.findUnique({
      where: { cartId_bookId: { cartId: cart.id, bookId: body.bookId } },
    });

    const nextQty = (existing?.quantity ?? 0) + body.quantity;
    if (nextQty > book.stock) {
      return NextResponse.json({ error: "Quantity exceeds stock" }, { status: 400 });
    }

    await db.cartItem.upsert({
      where: { cartId_bookId: { cartId: cart.id, bookId: body.bookId } },
      update: { quantity: nextQty },
      create: { cartId: cart.id, bookId: body.bookId, quantity: body.quantity },
    });

    const updated = await db.cart.findUnique({
      where: { id: cart.id },
      include: { items: { include: { book: true } } },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to add cart item" }, { status: 500 });
  }
}
