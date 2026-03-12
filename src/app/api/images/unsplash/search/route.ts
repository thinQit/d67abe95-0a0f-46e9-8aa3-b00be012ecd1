import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';

const searchSchema = z.object({
  query: z.string().min(1),
  page: z.number().optional(),
  per_page: z.number().optional()
});

type UnsplashResult = {
  id: string;
  urls: { regular: string };
  width: number;
  height: number;
  user: { name: string; username: string };
};

type UnsplashResponse = {
  results: UnsplashResult[];
  total: number;
};

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['seller', 'admin'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = searchSchema.parse(body);

    const accessKey = process.env.UNSPLASH_ACCESS_KEY;
    if (!accessKey) {
      return NextResponse.json({ success: true, data: { results: [], total: 0 } });
    }

    const url = new URL('https://api.unsplash.com/search/photos');
    url.searchParams.set('query', parsed.query);
    url.searchParams.set('page', String(parsed.page ?? 1));
    url.searchParams.set('per_page', String(parsed.per_page ?? 10));

    const response = await fetch(url.toString(), {
      headers: { Authorization: `Client-ID ${accessKey}` }
    });

    if (!response.ok) {
      return NextResponse.json({ success: false, error: 'Unsplash request failed' }, { status: 502 });
    }

    const data = (await response.json()) as UnsplashResponse;
    const results = data.results.map((item) => ({
      unsplashId: item.id,
      url: item.urls.regular,
      width: item.width,
      height: item.height,
      attribution: `${item.user.name} (@${item.user.username})`
    }));

    return NextResponse.json({ success: true, data: { results, total: data.total } });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to search Unsplash' }, { status: 500 });
  }
}
