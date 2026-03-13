import { NextRequest, NextResponse } from "next/server";
import { Prisma, OrderStatus } from "@prisma/client";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { checkoutSchema } from "@/lib/validators";

const TAX_RATE = 0.07;
const SHIPPING_FLAT = 4.99;
const FREE_SHIPPING_THRESHOLD = 50;

export async function GET() {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const orders = await db.order.findMany({
      where: { userId: session.user.id },
      include: { items: { include: { book: true } } },
      orderBy: { createdAt: "desc" as const },
    });

    return NextResponse.json(orders);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const parsed = checkoutSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const cart = await db.cart.findUnique({
      where: { userId: session.user.id },
      include: { items: { include: { book: true } } },
    });

    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    for (const item of cart.items) {
      if (item.book.archived || item.book.stock < item.quantity) {
        return NextResponse.json({ error: `Insufficient stock for ${item.book.title}` }, { status: 400 });
      }
    }

    const subtotalNum = cart.items.reduce((sum, i) => sum + Number(i.book.price) * i.quantity, 0);
    const taxNum = subtotalNum * TAX_RATE;
    const shippingNum = subtotalNum >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT;
    const totalNum = subtotalNum + taxNum + shippingNum;

    const order = await db.$transaction(async (tx) => {
      for (const item of cart.items) {
        await tx.book.update({
          where: { id: item.bookId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      const created = await tx.order.create({
        data: {
          orderNumber: `BS-${Date.now()}`,
          userId: session.user.id,
          status: OrderStatus.pending,
          subtotal: new Prisma.Decimal(subtotalNum.toFixed(2)),
          tax: new Prisma.Decimal(taxNum.toFixed(2)),
          shipping: new Prisma.Decimal(shippingNum.toFixed(2)),
          total: new Prisma.Decimal(totalNum.toFixed(2)),
          ...parsed.data,
          items: {
            create: cart.items.map((item) => ({
              bookId: item.bookId,
              quantity: item.quantity,
              unitPrice: item.book.price,
              lineTotal: new Prisma.Decimal((Number(item.book.price) * item.quantity).toFixed(2)),
            })),
          },
        },
        include: { items: true },
      });

      await tx.cartItem.deleteMany({ where: { cartId: cart.id } });
      return created;
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
