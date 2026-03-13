export const dynamic = 'force-dynamic';

import SearchBar from "@/components/SearchBar"
import GenreFilter from "@/components/GenreFilter"
import BookGrid from "@/components/BookGrid"
import CTAVortex from "@/components/CTAVortex"
import SectionReveal from "@/components/SectionReveal"

export default function CatalogPage() {
  return (
    <main className="bg-background text-foreground">
      <section
        className="relative min-h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577160/site-images/ecommerce/3756345.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-6 py-20 md:py-28">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground">Browse the catalog</h1>
          <p className="mt-4 max-w-3xl text-base md:text-lg text-primary-foreground/90">
            Search by title or author, filter by genre, and add to cart with stock-aware quantities.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <SearchBar placeholder="Search titles, authors…" />
            <GenreFilter
              genres={["Fantasy", "Mystery", "Romance", "Sci-Fi", "Nonfiction", "Technology"]}
              toggles={["Featured only", "In stock"]}
              sortOptions={["Featured", "Newest", "Price: Low to High", "Price: High to Low", "Top Rated"]}
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 animate-fade-in-up bg-card">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <SectionReveal>
            <BookGrid headline="All books" subheadline="Seeded titles with covers, ratings, price, and quick add-to-cart." />
          </SectionReveal>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CTAVortex
            title="Want your cart saved across devices?"
            subtitle="Sign in with Google to persist your cart and access order history."
            ctaLabel="Continue with Google"
            ctaHref="/login"
            secondaryCtaLabel="View orders"
            secondaryCtaHref="/account/orders"
          />
        </div>
      </section>
    </main>
  )
}
