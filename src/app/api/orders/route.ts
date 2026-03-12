import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { Prisma } from '@prisma/client';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';

const createSchema = z.object({
  items: z.array(z.object({ listingId: z.string(), quantity: z.number().min(1) })),
  paymentMethod: z.string().optional()
});

const querySchema = z.object({
  page: z.coerce.number().optional(),
  limit: z.coerce.number().optional()
});

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['buyer'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createSchema.parse(body);

    if (parsed.items.length === 0) {
      return NextResponse.json({ success: false, error: 'No items provided' }, { status: 400 });
    }

    const item = parsed.items[0];
    const listing = await db.listing.findUnique({ where: { id: item.listingId } });
    if (!listing) {
      return NextResponse.json({ success: false, error: 'Listing not found' }, { status: 404 });
    }

    if (listing.stock < item.quantity) {
      return NextResponse.json({ success: false, error: 'Insufficient stock' }, { status: 400 });
    }

    const totalPrice = listing.price * item.quantity;
    const order = await db.order.create({
      data: {
        buyerId: user.id,
        listingId: item.listingId,
        quantity: item.quantity,
        totalPrice,
        status: 'paid'
      }
    });

    const newStock = listing.stock - item.quantity;
    await db.listing.update({
      where: { id: listing.id },
      data: { stock: newStock, status: newStock === 0 ? 'out_of_stock' : listing.status }
    });

    return NextResponse.json({ success: true, data: { order } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to create order' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const params = querySchema.parse(Object.fromEntries(request.nextUrl.searchParams));
    const page = params.page ?? 1;
    const limit = params.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.OrderWhereInput = {};
    if (user.role === 'buyer') {
      where.buyerId = user.id;
    }
    if (user.role === 'seller') {
      where.listing = { sellerId: user.id };
    }

    const [items, total] = await Promise.all([
      db.order.findMany({ where, skip, take: limit, orderBy: { createdAt: 'desc' } }),
      db.order.count({ where })
    ]);

    return NextResponse.json({ success: true, data: { items, total } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid query parameters' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to fetch orders' }, { status: 500 });
  }
}
