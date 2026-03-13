import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

type Ctx = { params: { slug: string } };

export async function GET(_req: NextRequest, { params }: Ctx) {
  try {
    const book = await db.book.findFirst({
      where: { slug: params.slug, archived: false },
      include: { genre: true },
    });

    if (!book) return NextResponse.json({ error: "Book not found" }, { status: 404 });

    return NextResponse.json(book);
  } catch {
    return NextResponse.json({ error: "Failed to fetch book" }, { status: 500 });
  }
}
