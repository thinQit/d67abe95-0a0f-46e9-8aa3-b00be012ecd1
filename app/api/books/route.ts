import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { booksQuerySchema } from "@/lib/validators";

export async function GET(req: NextRequest) {
  try {
    const parsed = booksQuerySchema.parse(Object.fromEntries(req.nextUrl.searchParams.entries()));
    const { search, genre, featured, inStock, sort, cursor, take } = parsed;

    const where = {
      AND: [
        search
          ? {
              OR: [
                { title: { contains: search, mode: "insensitive" as const } },
                { author: { contains: search, mode: "insensitive" as const } },
              ],
            }
          : {},
        genre ? { genre } : {},
        featured ? { featured: true } : {},
        inStock ? { stock: { gt: 0 } } : {},
      ],
    };

    const orderBy =
      sort === "price_asc"
        ? [{ price: "asc" as const }]
        : sort === "price_desc"
          ? [{ price: "desc" as const }]
          : sort === "rating"
            ? [{ rating: "desc" as const }]
            : sort === "new"
              ? [{ createdAt: "desc" as const }]
              : [{ featured: "desc" as const }, { createdAt: "desc" as const }];

    const books = await db.book.findMany({
      where,
      orderBy,
      take: take + 1,
      ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
    });

    const hasMore = books.length > take;
    const items = hasMore ? books.slice(0, take) : books;
    const nextCursor = hasMore ? items[items.length - 1]?.id : null;

    return NextResponse.json({ items, nextCursor });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch books" }, { status: 500 });
  }
}
