import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const adminPassword = await bcrypt.hash('admin123', 10);
  const sellerPassword = await bcrypt.hash('seller123', 10);
  const buyerPassword = await bcrypt.hash('buyer123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@shelfmarket.com' },
    update: {},
    create: {
      email: 'admin@shelfmarket.com',
      name: 'ShelfMarket Admin',
      role: 'admin',
      oauthProvider: 'seed',
      passwordHash: adminPassword
    }
  });

  const seller = await prisma.user.upsert({
    where: { email: 'seller@shelfmarket.com' },
    update: {},
    create: {
      email: 'seller@shelfmarket.com',
      name: 'Lana Seller',
      role: 'seller',
      oauthProvider: 'seed',
      passwordHash: sellerPassword
    }
  });

  const buyer = await prisma.user.upsert({
    where: { email: 'buyer@shelfmarket.com' },
    update: {},
    create: {
      email: 'buyer@shelfmarket.com',
      name: 'Brett Buyer',
      role: 'buyer',
      oauthProvider: 'seed',
      passwordHash: buyerPassword
    }
  });

  const categoryNames = ['Fiction', 'Business', 'Technology', 'Self-Help', 'History', 'Fantasy'];
  const categories = [] as { id: string; name: string }[];

  for (const name of categoryNames) {
    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name }
    });
    categories.push(category);
  }

  const booksSeed = [
    {
      title: 'ShelfMarket Launch Manual',
      author: 'Jamie Reed',
      description: 'A practical guide to launching book marketplaces.',
      isbn: '9780000000001',
      publisher: 'Market Press',
      publishedDate: new Date('2020-05-10'),
      pages: 328,
      language: 'English',
      categoryIds: JSON.stringify([categories[1].id, categories[2].id]),
      coverImageUrl: '/images/feature.jpg'
    },
    {
      title: 'Stories for Sellers',
      author: 'Taylor Fox',
      description: 'Inspiring tales from the world of independent booksellers.',
      isbn: '9780000000002',
      publisher: 'Readers Guild',
      publishedDate: new Date('2022-02-15'),
      pages: 256,
      language: 'English',
      categoryIds: JSON.stringify([categories[0].id, categories[5].id]),
      coverImageUrl: '/images/hero.jpg'
    },
    {
      title: 'The Modern Reader',
      author: 'Avery Monroe',
      description: 'Exploring how readers discover and buy books today.',
      isbn: '9780000000003',
      publisher: 'Insight House',
      publishedDate: new Date('2021-09-02'),
      pages: 210,
      language: 'English',
      categoryIds: JSON.stringify([categories[3].id, categories[4].id]),
      coverImageUrl: '/images/cta.jpg'
    }
  ];

  const createdBooks = [] as { id: string; title: string }[];

  for (const book of booksSeed) {
    const existing = await prisma.book.findUnique({ where: { isbn: book.isbn } });
    if (existing) {
      createdBooks.push(existing);
      continue;
    }
    const created = await prisma.book.create({ data: book });
    createdBooks.push(created);
  }

  const listingOne = await prisma.listing.create({
    data: {
      bookId: createdBooks[0].id,
      sellerId: seller.id,
      price: 24.99,
      condition: 'like new',
      stock: 5,
      status: 'active'
    }
  });

  const listingTwo = await prisma.listing.create({
    data: {
      bookId: createdBooks[1].id,
      sellerId: seller.id,
      price: 18.5,
      condition: 'good',
      stock: 3,
      status: 'active'
    }
  });

  await prisma.order.create({
    data: {
      buyerId: buyer.id,
      listingId: listingOne.id,
      quantity: 1,
      totalPrice: listingOne.price,
      status: 'paid'
    }
  });

  await prisma.review.create({
    data: {
      bookId: createdBooks[0].id,
      reviewerId: buyer.id,
      rating: 5,
      comment: 'Fantastic insights and easy to follow.'
    }
  });

  await prisma.image.create({
    data: {
      source: 'unsplash',
      url: '/images/feature.jpg',
      width: 1200,
      height: 675,
      unsplashId: 'seed-image-1',
      attribution: 'Seeded image',
      bookId: createdBooks[0].id
    }
  });

  await prisma.image.create({
    data: {
      source: 'unsplash',
      url: '/images/hero.jpg',
      width: 1200,
      height: 675,
      unsplashId: 'seed-image-2',
      attribution: 'Seeded image',
      listingId: listingTwo.id
    }
  });

  await prisma.user.update({
    where: { id: admin.id },
    data: { name: 'ShelfMarket Admin' }
  });
}

main()
  .catch((error: unknown) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
