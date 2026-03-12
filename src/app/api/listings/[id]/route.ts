import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';

const updateSchema = z.object({
  price: z.number().optional(),
  condition: z.enum(['new', 'like new', 'good', 'fair']).optional(),
  stock: z.number().optional(),
  status: z.enum(['active', 'paused', 'sold', 'out_of_stock']).optional()
});

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const listing = await db.listing.findUnique({ where: { id: params.id } });
    if (!listing) {
      return NextResponse.json({ success: false, error: 'Listing not found' }, { status: 404 });
    }

    const [book, seller] = await Promise.all([
      db.book.findUnique({ where: { id: listing.bookId } }),
      db.user.findUnique({ where: { id: listing.sellerId } })
    ]);

    return NextResponse.json({ success: true, data: { listing, book, seller } });
  } catch (_error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch listing' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['seller'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const listing = await db.listing.findUnique({ where: { id: params.id } });
    if (!listing) {
      return NextResponse.json({ success: false, error: 'Listing not found' }, { status: 404 });
    }

    if (listing.sellerId !== user.id) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const body = await request.json();
    const parsed = updateSchema.parse(body);

    const updated = await db.listing.update({ where: { id: params.id }, data: parsed });
    return NextResponse.json({ success: true, data: { listing: updated } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to update listing' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['seller'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const listing = await db.listing.findUnique({ where: { id: params.id } });
    if (!listing) {
      return NextResponse.json({ success: false, error: 'Listing not found' }, { status: 404 });
    }

    if (listing.sellerId !== user.id) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    await db.listing.update({ where: { id: params.id }, data: { status: 'paused' } });
    return NextResponse.json({ success: true, data: { deleted: true } });
  } catch (_error) {
    return NextResponse.json({ success: false, error: 'Failed to delete listing' }, { status: 500 });
  }
}
