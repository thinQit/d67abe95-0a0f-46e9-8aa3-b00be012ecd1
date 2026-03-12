import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';

const createSchema = z.object({ name: z.string().min(1) });

export async function GET() {
  try {
    const categories = await db.category.findMany({ orderBy: { name: 'asc' } });
    return NextResponse.json({ success: true, data: { categories } });
  } catch (_error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch categories' }, { status: 500 });
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

    const category = await db.category.create({ data: { name: parsed.name } });
    return NextResponse.json({ success: true, data: { category } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to create category' }, { status: 500 });
  }
}
