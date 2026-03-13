import { NextRequest, NextResponse } from "next/server";
import { Prisma, UserRole } from "@prisma/client";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { adminInventoryPatchSchema } from "@/lib/validators";

export async function PATCH(req: NextRequest, { params }: { params: { bookId: string } }) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const parsed = adminInventoryPatchSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid payload", details: parsed.error.flatten() }, { status: 400 });
    }

    const data: Prisma.BookUpdateInput = {
      ...parsed.data,
      ...(parsed.data.price !== undefined ? { price: new Prisma.Decimal(parsed.data.price.toFixed(2)) } : {}),
      ...(parsed.data.compareAtPrice !== undefined
        ? {
            compareAtPrice:
              parsed.data.compareAtPrice === null ? null : new Prisma.Decimal(parsed.data.compareAtPrice.toFixed(2)),
          }
        : {}),
    };

    const updated = await db.book.update({
      where: { id: params.bookId },
      data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update inventory item" }, { status: 500 });
  }
}
