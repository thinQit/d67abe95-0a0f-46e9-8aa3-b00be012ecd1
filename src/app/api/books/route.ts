import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';

const bookSchema = z.object({
  title: z.string(),
  author: z.string(),
  description: z.string().optional(),
  isbn: z.string().optional(),
  publisher: z.string().optional(),
  publishedDate: z.string().optional(),
  pages: z.number().optional(),
  language: z.string().optional(),
  categoryIds: z.array(z.string()).optional(),
  coverImageUrl: z.string().optional(),
  unsplashImageId: z.string().optional()
});

const querySchema = z.object({
  q: z.string().optional(),
  author: z.string().optional(),
  isbn: z.string().optional(),
  category: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional(),
  sort: z.string().optional()
});

function serializeBook(book: {
  id: string;
  title: string;
  author: string;
  description: string | null;
  isbn: string | null;
  publisher: string | null;
  publishedDate: Date | null;
  pages: number | null;
  language: string | null;
  categoryIds: string | null;
  coverImageUrl: string | null;
  unsplashImageId: string | null;
  createdAt: Date;
}) {
  return {
    ...book,
    publishedDate: book.publishedDate ? book.publishedDate.toISOString() : null,
    categoryIds: book.categoryIds ? (JSON.parse(book.categoryIds) as string[]) : []
  };
}

export async function GET(request: NextRequest) {
  try {
    const params = querySchema.parse(Object.fromEntries(request.nextUrl.searchParams));
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const filters: Prisma.BookWhereInput = {};
    const orFilters: Prisma.BookWhereInput[] = [];

    if (params.q) {
      orFilters.push(
        { title: { contains: params.q, mode: 'insensitive' } },
        { author: { contains: params.q, mode: 'insensitive' } },
        { isbn: { contains: params.q, mode: 'insensitive' } }
      );
    }

    if (params.author) {
      filters.author = { contains: params.author, mode: 'insensitive' };
    }

    if (params.isbn) {
      filters.isbn = { contains: params.isbn, mode: 'insensitive' };
    }

    if (params.category) {
      filters.categoryIds = { contains: params.category };
    }

    if (orFilters.length) {
      filters.OR = orFilters;
    }

    const orderBy = params.sort ? ({ [params.sort]: 'asc' } as Prisma.BookOrderByWithRelationInput) : { createdAt: 'desc' };

    const [items, total] = await Promise.all([
      db.book.findMany({ where: filters, skip, take: limit, orderBy }),
      db.book.count({ where: filters })
    ]);

    return NextResponse.json({
      success: true,
      data: { items: items.map(serializeBook), total, page, limit }
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid query parameters' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to fetch books' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['seller', 'admin'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = bookSchema.parse(body);

    const book = await db.book.create({
      data: {
        title: parsed.title,
        author: parsed.author,
        description: parsed.description,
        isbn: parsed.isbn,
        publisher: parsed.publisher,
        publishedDate: parsed.publishedDate ? new Date(parsed.publishedDate) : undefined,
        pages: parsed.pages,
        language: parsed.language,
        categoryIds: parsed.categoryIds ? JSON.stringify(parsed.categoryIds) : undefined,
        coverImageUrl: parsed.coverImageUrl,
        unsplashImageId: parsed.unsplashImageId
      }
    });

    return NextResponse.json({ success: true, data: { book: serializeBook(book) } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to create book' }, { status: 500 });
  }
}
