import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireAdmin } from "@/lib/auth";

const seededBooks = [
  { slug: "atomic-habits", title: "Atomic Habits", author: "James Clear", genre: "Self-Improvement", price: 18.99, stock: 20, featured: true, rating: 4.8, reviewCount: 1240, coverImage: "/images/books/atomic-habits.jpg", description: "Tiny changes, remarkable results.", isbn13: "9780735211292" },
  { slug: "dune", title: "Dune", author: "Frank Herbert", genre: "Sci-Fi & Fantasy", price: 16.5, stock: 14, featured: true, rating: 4.7, reviewCount: 980, coverImage: "/images/books/dune.jpg", description: "Epic science fiction saga.", isbn13: "9780441172719" },
  { slug: "the-midnight-library", title: "The Midnight Library", author: "Matt Haig", genre: "Fiction", price: 14.99, stock: 18, featured: true, rating: 4.5, reviewCount: 612, coverImage: "/images/books/the-midnight-library.jpg", description: "A novel about regret and possibility.", isbn13: "9780525559474" },
  { slug: "the-lean-startup", title: "The Lean Startup", author: "Eric Ries", genre: "Business", price: 19, stock: 10, featured: true, rating: 4.6, reviewCount: 430, coverImage: "/images/books/the-lean-startup.jpg", description: "How today's entrepreneurs use continuous innovation.", isbn13: "9780307887894" },
];

export async function POST() {
  try {
    await requireAdmin();

    await db.$transaction(async (tx) => {
      for (const b of seededBooks) {
        await tx.book.upsert({
          where: { slug: b.slug },
          update: {
            title: b.title,
            author: b.author,
            genre: b.genre,
            price: b.price,
            stock: b.stock,
            featured: b.featured,
            rating: b.rating,
            reviewCount: b.reviewCount,
            coverImage: b.coverImage,
            description: b.description,
            isbn13: b.isbn13,
          },
          create: b,
        });
      }

      const dune = await tx.book.findUnique({ where: { slug: "dune" } });
      if (dune) {
        await tx.review.createMany({
          data: [
            { bookId: dune.id, name: "Avery L.", rating: 5, quote: "Great pacing and a satisfying ending." },
            { bookId: dune.id, name: "Chris D.", rating: 4, quote: "Strong characters and clear writing style." },
          ],
          skipDuplicates: true,
        });
      }
    });

    return NextResponse.json({ success: true, count: seededBooks.length });
  } catch (error) {
    if (error instanceof Error && (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to seed data" }, { status: 500 });
  }
}
