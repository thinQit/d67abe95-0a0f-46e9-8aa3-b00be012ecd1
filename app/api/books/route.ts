import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bookListQuerySchema } from "@/lib/validators";

export async function GET(req: NextRequest) {
  try {
    const parsed = bookListQuerySchema.safeParse(Object.fromEntries(req.nextUrl.searchParams.entries()));
    if (!parsed.success) {
      return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
    }

    const { search, genre, featured, inStock, sort, page, pageSize } = parsed.data;

    const where = {
      archived: false,
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: "insensitive" as const } },
              { author: { contains: search, mode: "insensitive" as const } },
            ],
          }
        : {}),
      ...(genre ? { genre: { name: { equals: genre, mode: "insensitive" as const } } } : {}),
      ...(typeof featured === "boolean" ? { featured } : {}),
      ...(inStock ? { stock: { gt: 0 } } : {}),
    };

    const orderBy =
      sort === "price_asc"
        ? { price: "asc" as const }
        : sort === "price_desc"
        ? { price: "desc" as const }
        : sort === "rating_desc"
        ? { rating: "desc" as const }
        : sort === "created_desc"
        ? { createdAt: "desc" as const }
        : { featured: "desc" as const };

    const [items, total] = await Promise.all([
      db.book.findMany({
        where,
        include: { genre: true },
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),
      db.book.count({ where }),
    ]);

    return NextResponse.json({ items, total, page, pageSize });
  } catch {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
