import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";
import { createOrderSchema } from "@/lib/validators";

function decimal(v: number) {
  return new Prisma.Decimal(v.toFixed(2));
}

export async function GET() {
  try {
    const session = await requireAuth();

    const orders = await db.order.findMany({
      where: { userId: session.user.id },
      include: { items: true },
      orderBy: [{ createdAt: "desc" as const }],
    });

    return NextResponse.json(orders);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await requireAuth();
    const body = createOrderSchema.parse(await req.json());

    const result = await db.$transaction(async (tx) => {
      const cart = await tx.cart.findUnique({
        where: { userId: session.user.id },
        include: { items: { include: { book: true } } },
      });

      if (!cart || cart.items.length === 0) {
        throw new Error("EMPTY_CART");
      }

      for (const item of cart.items) {
        if (item.quantity > item.book.stock) {
          throw new Error(`OUT_OF_STOCK:${item.book.title}`);
        }
      }

      const subtotalNum = cart.items.reduce(
        (sum, item) => sum + Number(item.book.price) * item.quantity,
        0
      );
      const shippingNum = subtotalNum > 50 ? 0 : 4.99;
      const taxNum = subtotalNum * 0.08;
      const totalNum = subtotalNum + shippingNum + taxNum;

      const created = await tx.order.create({
        data: {
          orderNumber: `BS-${Date.now()}`,
          userId: session.user.id,
          status: "PENDING",
          subtotal: decimal(subtotalNum),
          tax: decimal(taxNum),
          shipping: decimal(shippingNum),
          total: decimal(totalNum),
          shippingName: body.shippingName,
          shippingEmail: body.shippingEmail,
          shippingAddress1: body.shippingAddress1,
          shippingAddress2: body.shippingAddress2,
          shippingCity: body.shippingCity,
          shippingState: body.shippingState,
          shippingPostal: body.shippingPostal,
          shippingCountry: body.shippingCountry,
          items: {
            create: cart.items.map((item) => ({
              bookId: item.bookId,
              quantity: item.quantity,
              unitPrice: item.book.price,
              title: item.book.title,
              author: item.book.author,
              genre: item.book.genre,
            })),
          },
        },
        include: { items: true },
      });

      for (const item of cart.items) {
        await tx.book.update({
          where: { id: item.bookId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });

      return created;
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      if (error.message === "UNAUTHORIZED") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      if (error.message === "EMPTY_CART") {
        return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
      }
      if (error.message.startsWith("OUT_OF_STOCK")) {
        return NextResponse.json({ error: "One or more items are out of stock" }, { status: 400 });
      }
    }
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
