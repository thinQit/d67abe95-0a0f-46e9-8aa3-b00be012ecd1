import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { db } from "@/lib/db";
import { booksQuerySchema } from "@/lib/validators";

export async function GET(req: NextRequest) {
  try {
    const params = Object.fromEntries(req.nextUrl.searchParams.entries());
    const parsed = booksQuerySchema.safeParse(params);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid query", details: parsed.error.flatten() }, { status: 400 });
    }

    const { q, genre, featured, inStock, sort, page, pageSize } = parsed.data;

    const where: Prisma.BookWhereInput = {
      archived: false,
      ...(q
        ? {
            OR: [
              { title: { contains: q, mode: "insensitive" } },
              { author: { contains: q, mode: "insensitive" } },
              { isbn13: { contains: q, mode: "insensitive" } },
            ],
          }
        : {}),
      ...(genre ? { genre } : {}),
      ...(typeof featured === "boolean" ? { featured } : {}),
      ...(inStock ? { stock: { gt: 0 } } : {}),
    };

    const orderBy: Prisma.BookOrderByWithRelationInput =
      sort === "created_desc"
        ? { createdAt: "desc" as const }
        : sort === "price_asc"
          ? { price: "asc" as const }
          : sort === "price_desc"
            ? { price: "desc" as const }
            : sort === "rating_desc"
              ? { rating: "desc" as const }
              : { featured: "desc" as const };

    const [items, total] = await Promise.all([
      db.book.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.book.count({ where }),
    ]);

    return NextResponse.json({
      items,
      page,
      pageSize,
      total,
      hasMore: page * pageSize < total,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
