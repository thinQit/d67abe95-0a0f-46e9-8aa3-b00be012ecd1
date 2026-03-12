import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';

const createSchema = z.object({
  bookId: z.string(),
  rating: z.number().min(1).max(5),
  comment: z.string().optional()
});

const querySchema = z.object({
  bookId: z.string().optional(),
  reviewerId: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional()
});

export async function GET(request: NextRequest) {
  try {
    const params = querySchema.parse(Object.fromEntries(request.nextUrl.searchParams));
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const where = {
      bookId: params.bookId,
      reviewerId: params.reviewerId
    };

    const [items, total] = await Promise.all([
      db.review.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      db.review.count({ where })
    ]);

    return NextResponse.json({ success: true, data: { items, total, page, limit } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid query parameters' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['buyer'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createSchema.parse(body);

    const book = await db.book.findUnique({ where: { id: parsed.bookId } });
    if (!book) {
      return NextResponse.json({ success: false, error: 'Book not found' }, { status: 404 });
    }

    const order = await db.order.findFirst({
      where: { buyerId: user.id, listing: { bookId: parsed.bookId } }
    });

    if (!order) {
      return NextResponse.json({ success: false, error: 'Purchase required to review' }, { status: 403 });
    }

    const review = await db.review.create({
      data: {
        bookId: parsed.bookId,
        reviewerId: user.id,
        rating: parsed.rating,
        comment: parsed.comment
      }
    });

    return NextResponse.json({ success: true, data: { review } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to create review' }, { status: 500 });
  }
}
