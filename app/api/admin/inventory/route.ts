import { NextRequest, NextResponse } from "next/server";
import { Prisma, UserRole } from "@prisma/client";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { adminInventoryQuerySchema } from "@/lib/validators";

export async function GET(req: NextRequest) {
  try {
    const session = await getAuthSession();
    if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const params = Object.fromEntries(req.nextUrl.searchParams.entries());
    const parsed = adminInventoryQuerySchema.safeParse(params);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query", details: parsed.error.flatten() }, { status: 400 });
    }

    const { q, genre, stock, featured, page, pageSize } = parsed.data;

    const where: Prisma.BookWhereInput = {
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { author: { contains: q, mode: "insensitive" } },
              { isbn13: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(genre && genre !== "All" ? { genre } : {}),
      ...(stock === "in" ? { stock: { gt: 5 } } : {}),
      ...(stock === "low" ? { stock: { gt: 0, lte: 5 } } : {}),
      ...(stock === "out" ? { stock: { equals: 0 } } : {}),
      ...(featured === "featured" ? { featured: true } : {}),
      ...(featured === "not_featured" ? { featured: false } : {}),
    };

    const [items, total] = await Promise.all([
      db.book.findMany({
        where,
        orderBy: { updatedAt: "desc" as const },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.book.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, pageSize });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch inventory" }, { status: 500 });
  }
}
