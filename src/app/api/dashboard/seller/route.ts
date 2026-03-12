import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['seller'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const [recentOrders, activeListings, totalSales] = await Promise.all([
      db.order.findMany({
        where: { listing: { sellerId: user.id } },
        orderBy: { createdAt: 'desc' },
        take: 5
      }),
      db.listing.count({ where: { sellerId: user.id, status: 'active' } }),
      db.order.aggregate({
        where: { listing: { sellerId: user.id } },
        _sum: { totalPrice: true }
      })
    ]);

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          totalSales: totalSales._sum.totalPrice ?? 0,
          activeListings,
          recentOrders
        }
      }
    });
  } catch (_error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch dashboard' }, { status: 500 });
  }
}
