import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { updateCartItemSchema } from "@/lib/validators";

export async function PATCH(req: NextRequest, { params }: { params: { itemId: string } }) {
  try {
    const session = await requireAuth();
    const body = updateCartItemSchema.parse(await req.json());

    const item = await db.cartItem.findUnique({
      where: { id: params.itemId },
      include: { cart: true, book: true },
    });

    if (!item || item.cart.userId !== session.user.id) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    if (body.quantity === 0) {
      await db.cartItem.delete({ where: { id: item.id } });
    } else {
      if (body.quantity > item.book.stock) {
        return NextResponse.json({ error: "Quantity exceeds stock" }, { status: 400 });
      }
      await db.cartItem.update({
        where: { id: item.id },
        data: { quantity: body.quantity },
      });
    }

    const cart = await db.cart.findUnique({
      where: { id: item.cartId },
      include: { items: { include: { book: true } } },
    });

    return NextResponse.json(cart);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { itemId: string } }) {
  try {
    const session = await requireAuth();

    const item = await db.cartItem.findUnique({
      where: { id: params.itemId },
      include: { cart: true },
    });

    if (!item || item.cart.userId !== session.user.id) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    await db.cartItem.delete({ where: { id: item.id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to delete cart item" }, { status: 500 });
  }
}
