import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { cartSyncSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = cartSyncSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const cart = await db.cart.upsert({
      where: { userId: session.user.id },
      update: {},
      create: { userId: session.user.id },
    });

    for (const incoming of parsed.data.items) {
      const book = await db.book.findUnique({ where: { id: incoming.bookId } });
      if (!book || book.archived || book.stock <= 0) continue;

      const quantity = Math.min(incoming.quantity, book.stock);
      const existing = await db.cartItem.findUnique({
        where: { cartId_bookId: { cartId: cart.id, bookId: incoming.bookId } },
      });

      const nextQty = Math.min((existing?.quantity ?? 0) + quantity, book.stock);

      if (existing) {
        await db.cartItem.update({
          where: { id: existing.id },
          data: { quantity: nextQty },
        });
      } else {
        await db.cartItem.create({
          data: { cartId: cart.id, bookId: incoming.bookId, quantity: nextQty },
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to sync cart" }, { status: 500 });
  }
}
