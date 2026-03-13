export const dynamic = 'force-dynamic';

import BookCard from "@/components/BookCard"
import AddToCartButton from "@/components/AddToCartButton"
import RatingStars from "@/components/RatingStars"
import Price from "@/components/Price"
import StockBadge from "@/components/StockBadge"
import FeaturesGrid from "@/components/FeaturesGrid"
import BookGrid from "@/components/BookGrid"

export default function ProductDetailPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="py-20 md:py-28 animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-8 lg:grid-cols-2">
          <BookCard />
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold">Book details</h1>
            <p className="text-muted-foreground">
              Cover-first layout with clear pricing, rating, stock, and a frictionless add-to-cart.
            </p>
            <RatingStars rating={4.7} reviewCount={128} />
            <Price value={19.99} />
            <StockBadge label="In stock" />
            <div id="add-to-cart">
              <AddToCartButton label="Add to cart" className="transition-all duration-200 hover:scale-105" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <FeaturesGrid
            headline="What you’ll get"
            subheadline="A clear breakdown for confident buying decisions."
            features={[
              { icon: "BookOpen", title: "Overview", description: "Story/summary, key themes, and audience fit." },
              { icon: "FileText", title: "Details", description: "ISBN, format, pages, publisher, and publication date." },
              { icon: "Star", title: "Reviews", description: "Rating distribution and top reader highlights." },
            ]}
          />
        </div>
      </section>

      <section className="py-20 md:py-28 animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <BookGrid
            headline="More in this genre"
            subheadline="Keep browsing with genre-matched recommendations from the seeded catalog."
          />
        </div>
      </section>
    </main>
  )
}
