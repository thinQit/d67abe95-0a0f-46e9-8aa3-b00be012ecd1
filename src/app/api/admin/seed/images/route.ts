import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['admin'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const booksWithoutImages = await db.book.count({ where: { coverImageUrl: null } });
    return NextResponse.json({
      success: true,
      data: { matched: 0, skipped: booksWithoutImages }
    });
  } catch (_error) {
    return NextResponse.json({ success: false, error: 'Failed to seed images' }, { status: 500 });
  }
}
