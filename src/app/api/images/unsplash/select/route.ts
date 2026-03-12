import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';

const selectSchema = z.object({
  bookId: z.string().optional(),
  listingId: z.string().optional(),
  unsplashId: z.string(),
  url: z.string(),
  width: z.number().optional(),
  height: z.number().optional(),
  attribution: z.string().optional()
});

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['seller', 'admin'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = selectSchema.parse(body);

    if (!parsed.bookId && !parsed.listingId) {
      return NextResponse.json({ success: false, error: 'bookId or listingId required' }, { status: 400 });
    }

    const image = await db.image.create({
      data: {
        source: 'unsplash',
        url: parsed.url,
        width: parsed.width,
        height: parsed.height,
        unsplashId: parsed.unsplashId,
        attribution: parsed.attribution,
        bookId: parsed.bookId,
        listingId: parsed.listingId
      }
    });

    if (parsed.bookId) {
      await db.book.update({
        where: { id: parsed.bookId },
        data: { coverImageUrl: parsed.url, unsplashImageId: parsed.unsplashId }
      });
    }

    if (parsed.listingId) {
      await db.listing.update({
        where: { id: parsed.listingId },
        data: { status: 'active' }
      });
    }

    return NextResponse.json({ success: true, data: { image } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to select image' }, { status: 500 });
  }
}
