import { NextRequest, NextResponse } from "next/server";
import { Prisma, UserRole, BookFormat } from "@prisma/client";
import { db } from "@/lib/db";

const seededBooks = [
  { slug: "atomic-habits", title: "Atomic Habits", author: "James Clear", genre: "Self-Improvement", price: 18.99, compareAtPrice: 22.99, rating: 4.8, reviewCount: 3124, stock: 20, featured: true, isbn13: "9780735211292" },
  { slug: "dune", title: "Dune", author: "Frank Herbert", genre: "Fantasy", price: 16.5, compareAtPrice: 19.0, rating: 4.7, reviewCount: 2450, stock: 14, featured: true, isbn13: "9780441013593" },
  { slug: "the-pragmatic-programmer", title: "The Pragmatic Programmer", author: "Andrew Hunt, David Thomas", genre: "Technology", price: 39.0, compareAtPrice: 45.0, rating: 4.9, reviewCount: 980, stock: 11, featured: true, isbn13: "9780135957059" },
  { slug: "educated", title: "Educated", author: "Tara Westover", genre: "Biography", price: 14.99, compareAtPrice: 18.99, rating: 4.6, reviewCount: 2105, stock: 18, featured: true, isbn13: "9780399590504" },
];

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("x-seed-token");
    if (!token || token !== process.env.SEED_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await Promise.all(
      seededBooks.map((book) =>
        db.book.upsert({
          where: { slug: book.slug },
          update: {
            ...book,
            price: new Prisma.Decimal(book.price.toFixed(2)),
            compareAtPrice: new Prisma.Decimal(book.compareAtPrice.toFixed(2)),
            rating: new Prisma.Decimal(book.rating.toFixed(2)),
          },
          create: {
            ...book,
            format: BookFormat.PAPERBACK,
            language: "English",
            price: new Prisma.Decimal(book.price.toFixed(2)),
            compareAtPrice: new Prisma.Decimal(book.compareAtPrice.toFixed(2)),
            rating: new Prisma.Decimal(book.rating.toFixed(2)),
          },
        }),
      ),
    );

    if (process.env.ADMIN_EMAIL) {
      await db.user.upsert({
        where: { email: process.env.ADMIN_EMAIL },
        update: { role: UserRole.ADMIN },
        create: {
          email: process.env.ADMIN_EMAIL,
          name: "BookShop Admin",
          role: UserRole.ADMIN,
        },
      });
    }

    return NextResponse.json({ success: true, booksSeeded: seededBooks.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to seed data" }, { status: 500 });
  }
}
