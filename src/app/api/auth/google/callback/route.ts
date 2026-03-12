import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';
import { signToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const code = request.nextUrl.searchParams.get('code');
    if (!code) {
      return NextResponse.json({ success: false, error: 'Missing code' }, { status: 400 });
    }

    const email = `google_${code}@shelfmarket.local`;
    const user = await db.user.upsert({
      where: { email },
      update: {},
      create: {
        email,
        name: 'ShelfMarket Reader',
        role: 'buyer',
        oauthProvider: 'google'
      }
    });

    const token = signToken({ sub: user.id, role: user.role, email: user.email });
    return NextResponse.json({ success: true, data: { token, user } });
  } catch (_error) {
    return NextResponse.json({ success: false, error: 'Failed to process Google OAuth' }, { status: 500 });
  }
}
