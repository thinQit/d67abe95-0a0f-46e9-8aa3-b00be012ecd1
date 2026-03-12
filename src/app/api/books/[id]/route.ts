import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';

const updateSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
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

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const book = await db.book.findUnique({ where: { id: params.id } });
    if (!book) {
      return NextResponse.json({ success: false, error: 'Book not found' }, { status: 404 });
    }
    const [listings, reviews] = await Promise.all([
      db.listing.findMany({ where: { bookId: params.id } }),
      db.review.findMany({ where: { bookId: params.id } })
    ]);

    return NextResponse.json({
      success: true,
      data: { book: serializeBook(book), listings, reviews }
    });
  } catch (_error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch book' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['seller', 'admin'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = updateSchema.parse(body);

    const book = await db.book.update({
      where: { id: params.id },
      data: {
        ...parsed,
        publishedDate: parsed.publishedDate ? new Date(parsed.publishedDate) : undefined,
        categoryIds: parsed.categoryIds ? JSON.stringify(parsed.categoryIds) : undefined
      }
    });

    return NextResponse.json({ success: true, data: { book: serializeBook(book) } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to update book' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['admin'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await db.book.delete({ where: { id: params.id } });
    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (_error) {
    return NextResponse.json({ success: false, error: 'Failed to delete book' }, { status: 500 });
  }
}
