import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { cartMergeSchema } from "@/lib/validators";

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const body = cartMergeSchema.parse(await req.json());

    const cart =
      (await db.cart.findUnique({ where: { userId: session.user.id } })) ??
      (await db.cart.create({ data: { userId: session.user.id } }));

    await db.$transaction(
      body.items.map((item) =>
        db.cartItem.upsert({
          where: { cartId_bookId: { cartId: cart.id, bookId: item.bookId } },
          update: {
            quantity: {
              increment: item.quantity,
            },
          },
          create: {
            cartId: cart.id,
            bookId: item.bookId,
            quantity: item.quantity,
          },
        })
      )
    );

    const merged = await db.cart.findUnique({
      where: { id: cart.id },
      include: { items: { include: { book: true } } },
    });

    return NextResponse.json(merged);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to merge cart" }, { status: 500 });
  }
}
