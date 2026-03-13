export const dynamic = 'force-dynamic';

import ProductGrid from '@/components/ProductGrid'
import CTAVortex from '@/components/CTAVortex'
import Skeletons from '@/components/Skeletons'

export default function CatalogPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Browse the catalog</h1>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            Search by title, filter by genre, and sort by price, rating, or newest arrivals.
          </p>
        </div>
      </section>
      <section className="animate-fade-in-up py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <ProductGrid headline="All books" subheadline="Seeded content with cover images, ratings, and stock-aware add-to-cart." />
        </div>
      </section>
      <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <Skeletons type="products" />
        </div>
      </section>
      <section className="animate-fade-in-up py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <CTAVortex
            title="Save your cart across devices"
            subtitle="Sign in with Google to keep your cart and view order history."
            ctaLabel="Continue with Google"
            ctaHref="/login"
            secondaryCtaLabel="View orders"
            secondaryCtaHref="/orders"
          />
        </div>
      </section>
    </div>
  )
}
