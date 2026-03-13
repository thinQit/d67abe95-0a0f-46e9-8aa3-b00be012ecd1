"use client";

import BookCard from "@/components/BookCard";

interface Book {
  title: string;
  author: string;
  price: number;
  rating: number;
  reviewCount: number;
  genre: string;
  stockLabel: string;
  href: string;
  imageUrl: string;
  tag?: string;
}

interface BookGridProps {
  headline: string;
  subheadline?: string;
  books: Book[];
}

export default function BookGrid({
  headline = "Seeded catalog",
  subheadline,
  books = [],
}: Partial<BookGridProps>) {
  const safeBooks =
    books.length > 0
      ? books
      : [
          {
            title: "The Midnight Archive",
            author: "Elena Ward",
            price: 19.99,
            rating: 4.7,
            reviewCount: 128,
            genre: "Fantasy",
            stockLabel: "In stock",
            href: "/book/the-midnight-archive",
            imageUrl:
              "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577111/site-images/ecommerce/3767397.jpg",
            tag: "Bestseller",
          },
          {
            title: "Harbor of Secrets",
            author: "Mina Patel",
            price: 16.5,
            rating: 4.5,
            reviewCount: 94,
            genre: "Mystery",
            stockLabel: "In stock",
            href: "/book/harbor-of-secrets",
            imageUrl:
              "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577164/site-images/ecommerce/11952301.jpg",
            tag: "New",
          },
        ];
  return (
    <section>
      <div className="mb-10 text-center">
        {headline && (
          <h2 className="text-3xl md:text-4xl font-bold">{headline}</h2>
        )}
        {subheadline && (
          <p className="mt-2 text-lg text-muted-foreground">{subheadline}</p>
        )}
      </div>
      <div className="grid gap-6 md:gap-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {safeBooks.map((book, i) => (
          <BookCard key={book.href} {...book} />
        ))}
      </div>
    </section>
  );
}
