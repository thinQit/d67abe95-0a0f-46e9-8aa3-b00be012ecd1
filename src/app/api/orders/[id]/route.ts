import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser(request);
    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const orderWithListing = await db.order.findUnique({
      where: { id: params.id },
      include: { listing: true }
    });

    if (!orderWithListing) {
      return NextResponse.json({ success: false, error: 'Order not found' }, { status: 404 });
    }

    const isBuyer = orderWithListing.buyerId === user.id;
    const isSeller = orderWithListing.listing.sellerId === user.id;
    const isAdmin = userHasRole(user, ['admin']);

    if (!isBuyer && !isSeller && !isAdmin) {
      return NextResponse.json({ success: false, error: 'Forbidden' }, { status: 403 });
    }

    const { listing, ...order } = orderWithListing;
    return NextResponse.json({ success: true, data: { order } });
  } catch (_error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch order' }, { status: 500 });
  }
}
