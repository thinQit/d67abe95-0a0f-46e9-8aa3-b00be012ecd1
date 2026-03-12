import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';

const createSchema = z.object({
  source: z.enum(['unsplash', 'uploaded']).optional(),
  url: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  unsplashId: z.string().optional(),
  attribution: z.string().optional(),
  bookId: z.string().optional(),
  listingId: z.string().optional()
});

const querySchema = z.object({
  bookId: z.string().optional(),
  listingId: z.string().optional()
});

export async function GET(request: NextRequest) {
  try {
    const params = querySchema.parse(Object.fromEntries(request.nextUrl.searchParams));
    const images = await db.image.findMany({
      where: { bookId: params.bookId, listingId: params.listingId },
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json({ success: true, data: { images } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid query parameters' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to fetch images' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['seller', 'admin'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = createSchema.parse(body);

    const image = await db.image.create({
      data: {
        source: parsed.source ?? 'unsplash',
        url: parsed.url,
        width: parsed.width,
        height: parsed.height,
        unsplashId: parsed.unsplashId,
        attribution: parsed.attribution,
        bookId: parsed.bookId,
        listingId: parsed.listingId
      }
    });

    return NextResponse.json({ success: true, data: { image } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to create image' }, { status: 500 });
  }
}
