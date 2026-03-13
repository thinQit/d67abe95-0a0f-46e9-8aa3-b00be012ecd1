"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import RatingStars from "@/components/RatingStars";
import Price from "@/components/Price";
import StockBadge from "@/components/StockBadge";

interface BookCardProps {
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

export default function BookCard({
  title = "Book Title",
  author = "Author Name",
  price = 19.99,
  rating = 4.5,
  reviewCount = 101,
  genre = "Fiction",
  stockLabel = "In stock",
  href = "/book/book-slug",
  imageUrl = "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577111/site-images/ecommerce/3767397.jpg",
  tag,
}: Partial<BookCardProps>) {
  return (
    <Link
      href={href}
      className={cn(
        "card-hover rounded-xl border bg-card shadow-sm flex flex-col group transition-all hover:shadow-md focus:outline-none focus:ring-2 focus:ring-primary w-full"
      )}
    >
      <div className="relative w-full aspect-[4/5] rounded-t-xl overflow-hidden bg-muted">
        {/* Book Cover */}
        <Image
          src={imageUrl}
          alt={title}
          width={400}
          height={500}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-200"
          unoptimized
        />
        {tag && (
          <div className="absolute top-3 left-3 z-10 bg-primary/90 text-white text-xs px-2 py-1 rounded font-bold shadow">
            {tag}
          </div>
        )}
      </div>
      <div className="flex flex-col flex-1 p-3">
        <div className="flex-1 min-h-0 truncate">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 truncate">
            {title}
          </h3>
          <span className="text-muted-foreground text-sm block truncate">
            {author}
          </span>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          <RatingStars rating={rating} reviewCount={reviewCount} />
          <Price amount={price} currency="USD" />
          <StockBadge
            className="mt-1 w-min"
            stock={stockLabel === "Out of stock" ? 0 : stockLabel === "Low stock" ? 3 : 10}
          />
        </div>
      </div>
    </Link>
  );
}
