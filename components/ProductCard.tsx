'use client';
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Eye } from "lucide-react";
import PriceTag from "@/components/PriceTag";
import RatingStars from "@/components/RatingStars";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ProductCardProps {
  slug: string;
  title: string;
  author: string;
  genre: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  imageUrl?: string;
  stock?: number;
  onAddToCart?: () => void;
  onQuickView?: () => void;
}

export default function ProductCard({
  slug,
  title,
  author,
  genre,
  price,
  compareAtPrice,
  rating,
  reviewCount,
  badge,
  imageUrl,
  stock = 12,
  onAddToCart,
  onQuickView,
}: ProductCardProps) {
  const inStock = stock > 0;

  return (
    <article
      className={cn(
        "card-hover group relative flex flex-col items-stretch rounded-xl border bg-card p-3 shadow-sm transition-shadow hover:shadow-md",
        !inStock && "opacity-70 pointer-events-none"
      )}
      tabIndex={0}
      aria-label={`View details for ${title} by ${author}`}
    >
      <Link href={`/book/${slug}`} tabIndex={-1}>
        <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg bg-muted">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={`Book cover: ${title} by ${author}`}
              width={420}
              height={560}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              style={{ aspectRatio: "3/4" }}
              priority={false}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              <span className="font-medium text-lg">No cover</span>
            </div>
          )}
          {badge && (
            <span className="absolute left-2 top-2 z-10 rounded bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground shadow">
              {badge}
            </span>
          )}
          {!inStock && (
            <span className="absolute bottom-2 right-2 z-10 rounded bg-destructive px-2 py-0.5 text-xs font-semibold text-white shadow">
              Out of stock
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col justify-between gap-3 mt-4">
        <Link href={`/book/${slug}`}>
          <h3 className="line-clamp-2 text-lg font-bold text-foreground transition group-hover:text-primary">
            {title}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground mt-1">
          by <span className="font-medium">{author}</span>
        </p>
        <div className="my-2">
          <PriceTag price={price} compareAtPrice={compareAtPrice} />
        </div>
        <div className="flex items-center gap-2">
          <RatingStars rating={rating} count={reviewCount} />
        </div>
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            variant="default"
            className="w-full"
            aria-label={inStock ? "Add to cart" : "Out of stock"}
            onClick={(e) => {
              if (inStock) onAddToCart?.();
              e.stopPropagation();
            }}
            disabled={!inStock}
          >
            <ShoppingCart className="h-4 w-4 mr-1.5" />
            Add to cart
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="w-full"
            aria-label="Quick view"
            onClick={(e) => {
              onQuickView?.();
              e.stopPropagation();
            }}
          >
            <Eye className="h-4 w-4 mr-1.5" />
            Quick view
          </Button>
        </div>
      </div>
    </article>
  );
}
