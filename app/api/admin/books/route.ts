import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";
import { adminBookCreateSchema } from "@/lib/validators";

export async function GET(req: NextRequest) {
  try {
    await requireAdmin();
    const q = req.nextUrl.searchParams.get("q") ?? "";
    const genre = req.nextUrl.searchParams.get("genre") ?? "";
    const featured = req.nextUrl.searchParams.get("featured");

    const books = await db.book.findMany({
      where: {
        AND: [
          q
            ? {
                OR: [
                  { title: { contains: q, mode: "insensitive" as const } },
                  { author: { contains: q, mode: "insensitive" as const } },
                ],
              }
            : {},
          genre ? { genre } : {},
          featured === "true" ? { featured: true } : {},
        ],
      },
      orderBy: [{ updatedAt: "desc" as const }],
    });

    return NextResponse.json(books);
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to fetch admin books" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();
    const body = adminBookCreateSchema.parse(await req.json());

    const created = await db.book.create({
      data: body,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 });
  }
}
