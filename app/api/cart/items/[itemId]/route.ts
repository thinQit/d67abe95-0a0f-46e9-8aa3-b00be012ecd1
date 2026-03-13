import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { patchCartItemSchema } from "@/lib/validators";

export async function PATCH(req: NextRequest, { params }: { params: { itemId: string } }) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = patchCartItemSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const item = await db.cartItem.findUnique({
      where: { id: params.itemId },
      include: { cart: true, book: true },
    });

    if (!item || item.cart.userId !== session.user.id) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    const qty = Math.min(parsed.data.quantity, item.book.stock);

    if (qty === 0) {
      await db.cartItem.delete({ where: { id: item.id } });
      return NextResponse.json({ success: true, removed: true });
    }

    const updated = await db.cartItem.update({
      where: { id: item.id },
      data: { quantity: qty },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update cart item" }, { status: 500 });
  }
}

export async function DELETE(_: NextRequest, { params }: { params: { itemId: string } }) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const item = await db.cartItem.findUnique({
      where: { id: params.itemId },
      include: { cart: true },
    });

    if (!item || item.cart.userId !== session.user.id) {
      return NextResponse.json({ error: "Cart item not found" }, { status: 404 });
    }

    await db.cartItem.delete({ where: { id: params.itemId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to remove cart item" }, { status: 500 });
  }
}
