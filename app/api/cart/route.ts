import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAuth } from "@/lib/auth";

export async function GET() {
  try {
    const session = await requireAuth();

    const cart =
      (await db.cart.findUnique({
        where: { userId: session.user.id },
        include: { items: { include: { book: true } } },
      })) ??
      (await db.cart.create({
        data: { userId: session.user.id },
        include: { items: { include: { book: true } } },
      }));

    return NextResponse.json(cart);
  } catch (error) {
    if (error instanceof Error && error.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}
