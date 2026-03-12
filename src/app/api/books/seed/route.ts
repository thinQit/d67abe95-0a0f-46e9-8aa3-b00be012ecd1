import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import db from '@/lib/db';
import { getCurrentUser, userHasRole } from '@/lib/auth-helpers';

const seedSchema = z.object({ source: z.string().optional() });

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser(request);
    if (!user || !userHasRole(user, ['admin'])) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const parsed = seedSchema.parse(body);

    const categories = ['Fiction', 'Business', 'Technology'];
    const categoryIds: string[] = [];

    for (const name of categories) {
      const category = await db.category.upsert({
        where: { name },
        update: {},
        create: { name }
      });
      categoryIds.push(category.id);
    }

    const seedBooks = [
      {
        title: 'The ShelfMarket Handbook',
        author: 'Morgan Lane',
        isbn: '9780000000100',
        publisher: 'Market Press',
        description: 'A complete guide to running listings and order flows.',
        publishedDate: new Date('2021-06-15'),
        pages: 280,
        language: 'English',
        categoryIds: JSON.stringify([categoryIds[1]]),
        coverImageUrl: '/images/hero.jpg'
      },
      {
        title: 'Catalog Craft',
        author: 'Riley Chen',
        isbn: '9780000000101',
        publisher: 'Readers Guild',
        description: 'Strategies for building a modern catalog.',
        publishedDate: new Date('2020-11-02'),
        pages: 192,
        language: 'English',
        categoryIds: JSON.stringify([categoryIds[0], categoryIds[2]]),
        coverImageUrl: '/images/feature.jpg'
      }
    ];

    let seededCount = 0;
    for (const book of seedBooks) {
      const existing = await db.book.findUnique({ where: { isbn: book.isbn } });
      if (existing) continue;
      await db.book.create({ data: book });
      seededCount += 1;
    }

    return NextResponse.json({
      success: true,
      data: {
        seededCount,
        message: parsed.source ? `Seeded from ${parsed.source}` : 'Seed completed'
      }
    });
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Failed to seed catalog' }, { status: 500 });
  }
}
