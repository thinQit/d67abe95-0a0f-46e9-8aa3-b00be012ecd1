export const dynamic = 'force-dynamic';

import HeroSpotlight from "@/components/HeroSpotlight"
import CategoryNav from "@/components/CategoryNav"
import ProductCard from "@/components/ProductCard"
import TrustBadges from "@/components/TrustBadges"
import TestimonialsGrid from "@/components/TestimonialsGrid"
import NewsletterForm from "@/components/NewsletterForm"
import StatsCounter from "@/components/StatsCounter"

export default function HomePage() {
  return (
    <main>
      <section
        className="animate-fade-in-up min-h-[80vh] bg-cover bg-center bg-no-repeat py-20 md:py-28"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url('https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577126/site-images/ecommerce/16675636.jpg')",
        }}
      >
        <div className="mx-auto max-w-7xl px-4">
          <HeroSpotlight
            title="Find your next favorite book in minutes."
            subtitle="Browse a curated, seeded catalog of modern classics, page-turning fiction, and must-read non‑fiction. Fast search, genre filters, and a cart that follows you across devices."
            primaryCta={{ label: "Shop the catalog", href: "/catalog" }}
            secondaryCta={{ label: "Browse genres", href: "/catalog?genre=Fiction" }}
          />
          <div className="mt-8">
            <StatsCounter
              stats={[
                { label: "Seeded titles", value: "48" },
                { label: "Genres", value: "10" },
                { label: "Avg. rating", value: "4.6/5" },
              ]}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
