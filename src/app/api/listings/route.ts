import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';

const createSchema = z.object({
  bookId: z.string(),
  price: z.number(),
  condition: z.enum(['new', 'like new', 'good', 'fair']),
  stock: z.number()
});

const querySchema = z.object({
  bookId: z.string().optional(),
  sellerId: z.string().optional(),
  minPrice: z.coerce.number().optional(),
  maxPrice: z.coerce.number().optional(),
  condition: z.string().optional(),
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional()
});

export async function GET(request: NextRequest) {
  try {
    const params = querySchema.parse(Object.fromEntries(request.nextUrl.searchParams));
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const filters: Prisma.ListingWhereInput = {};
    if (params.bookId) filters.bookId = params.bookId;
    if (params.sellerId) filters.sellerId = params.sellerId;
    if (params.condition) filters.condition = params.condition;
    if (params.minPrice || params.maxPrice) {
      filters.price = {
        gte: params.minPrice ?? undefined,
        lte: params.maxPrice ?? undefined
      };
    }

    const [items, total] = await Promise.all([
      db.listing.findMany({ where: filters, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      db.listing.count({ where: filters })
    ]);

    return NextResponse.json({ success: true, data: { items, total, page } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid query parameters' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to fetch listings' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['seller'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createSchema.parse(body);

    const book = await db.book.findUnique({ where: { id: parsed.bookId } });
    if (!book) {
      return NextResponse.json({ success: false, error: 'Book not found' }, { status: 404 });
    }

    const listing = await db.listing.create({
      data: {
        bookId: parsed.bookId,
        sellerId: user.id,
        price: parsed.price,
        condition: parsed.condition,
        stock: parsed.stock,
        status: parsed.stock > 0 ? 'active' : 'out_of_stock'
      }
    });

    return NextResponse.json({ success: true, data: { listing } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to create listing' }, { status: 500 });
  }
}
