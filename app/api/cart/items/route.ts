import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { addCartItemSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = addCartItemSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const { bookId, quantity } = parsed.data;
    const book = await db.book.findUnique({ where: { id: bookId } });
    if (!book || book.archived) return NextResponse.json({ error: "Book not found" }, { status: 404 });
    if (book.stock < 1) return NextResponse.json({ error: "Out of stock" }, { status: 400 });

    const cart = await db.cart.upsert({
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id },
    });

    const existing = await db.cartItem.findUnique({
      where: { cartId_bookId: { cartId: cart.id, bookId } },
    });

    const nextQty = Math.min((existing?.quantity ?? 0) + quantity, book.stock);
    if (nextQty <= 0) return NextResponse.json({ error: "Invalid quantity" }, { status: 400 });

    const item = existing
      ? await db.cartItem.update({
          where: { id: existing.id },
          data: { quantity: nextQty },
        })
      : await db.cartItem.create({
          data: { cartId: cart.id, bookId, quantity: nextQty },
        });

    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add cart item" }, { status: 500 });
  }
}
