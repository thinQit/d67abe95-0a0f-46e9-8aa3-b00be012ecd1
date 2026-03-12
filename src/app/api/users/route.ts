import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';
import { hashPassword } from '@/lib/auth';

const createSchema = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  role: z.enum(['buyer', 'seller', 'admin']).optional(),
  password: z.string().min(6).optional()
});

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['admin'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const page = Number(request.nextUrl.searchParams.get('page') ?? 1);
    const limit = Number(request.nextUrl.searchParams.get('limit') ?? 20);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      db.user.findMany({ skip, take: limit, orderBy: { createdAt: 'desc' } }),
      db.user.count()
    ]);

    return NextResponse.json({ success: true, data: { items, total, page, limit } });
  } catch (_error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch users' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['admin'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createSchema.parse(body);

    const passwordHash = parsed.password ? await hashPassword(parsed.password) : undefined;
    const newUser = await db.user.create({
      data: {
        email: parsed.email,
        name: parsed.name,
        role: parsed.role ?? 'buyer',
        oauthProvider: parsed.password ? 'local' : 'seed',
        passwordHash
      }
    });

    return NextResponse.json({ success: true, data: { user: newUser } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to create user' }, { status: 500 });
  }
}
