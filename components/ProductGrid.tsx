"use client";

import ProductCard from "@/components/ProductCard";

export interface Product {
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
}

interface ProductGridProps {
  headline?: string;
  subheadline?: string;
  products: Product[];
}

export default function ProductGrid({
  headline = "Books you’ll love",
  subheadline,
  products = [],
}: Partial<ProductGridProps>) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        {headline && (
          <h2 className="text-3xl md:text-4xl font-bold mb-2">{headline}</h2>
        )}
        {subheadline && (
          <p className="mb-6 text-lg text-muted-foreground">{subheadline}</p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p.slug} {...p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// NOTE: ProductCard component must exist in "@/components/ProductCard.tsx"
// with a full implementation. If not, create it.
