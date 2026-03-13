export const dynamic = 'force-dynamic';

import HeroSpotlight from "@/components/HeroSpotlight"
import CategoryNav from "@/components/CategoryNav"
import BookGrid from "@/components/BookGrid"
import TrustBadges from "@/components/TrustBadges"
import TestimonialsGrid from "@/components/TestimonialsGrid"
import NewsletterForm from "@/components/NewsletterForm"
import FeaturesGrid from "@/components/FeaturesGrid"
import StatsCounter from "@/components/StatsCounter"
import GalleryMasonry from "@/components/GalleryMasonry"
import SectionReveal from "@/components/SectionReveal"

export default function HomePage() {
  return (
    <main className="bg-background text-foreground">
      <section
        className="relative min-h-[80vh] bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577110/site-images/ecommerce/17485351.jpg)",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10">
          <HeroSpotlight
            title="Find your next favorite book—fast, curated, and in stock."
            subtitle="Browse seeded bestsellers, filter by genre, and build your cart in seconds. Sign in with Google to save your cart across devices."
            primaryCta={{ label: "Shop the Catalog", href: "/catalog" }}
            secondaryCta={{ label: "Explore Genres", href: "/catalog?genre=Fantasy" }}
          />
        </div>
      </section>

      <div className="animate-fade-in-up">
        <SectionReveal>
          <StatsCounter
            stats={[
              { value: "12", label: "Genres" },
              { value: "48+", label: "Seeded titles" },
              { value: "2–4 days", label: "Avg. ship time" },
            ]}
            bgColor="bg-muted"
          />
        </SectionReveal>
      </div>

      <section className="py-20 md:py-28 animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CategoryNav
            headline="Shop by genre"
            subheadline="Jump into the shelves people browse most—then refine with filters."
            primaryCta={{ label: "View all genres", href: "/catalog" }}
            secondaryCta={{ label: "See featured", href: "/catalog?featured=true" }}
            categories={[
              { name: "Fantasy", href: "/catalog?genre=Fantasy", countLabel: "8 titles" },
              { name: "Mystery & Thriller", href: "/catalog?genre=Mystery", countLabel: "7 titles" },
              { name: "Romance", href: "/catalog?genre=Romance", countLabel: "6 titles" },
              { name: "Science Fiction", href: "/catalog?genre=Sci-Fi", countLabel: "6 titles" },
              { name: "Nonfiction", href: "/catalog?genre=Nonfiction", countLabel: "7 titles" },
              { name: "Technology", href: "/catalog?genre=Technology", countLabel: "6 titles" },
            ]}
          />
        </div>
      </section>

      <section className="py-20 md:py-28 animate-fade-in-up bg-card">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <BookGrid
            headline="Featured books, ready to ship"
            subheadline="Hand-picked from the seeded catalog—great covers, great reviews, and reliable stock."
            books={[
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
              {
                title: "Practical TypeScript",
                author: "Noah Kim",
                price: 34,
                rating: 4.8,
                reviewCount: 211,
                genre: "Technology",
                stockLabel: "Low stock",
                href: "/book/practical-typescript",
                imageUrl:
                  "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577109/site-images/ecommerce/10330112.jpg",
                tag: "Staff pick",
              },
              {
                title: "The Quiet Equation",
                author: "Sofia Laurent",
                price: 22,
                rating: 4.6,
                reviewCount: 76,
                genre: "Sci-Fi",
                stockLabel: "In stock",
                href: "/book/the-quiet-equation",
                imageUrl:
                  "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577147/site-images/ecommerce/35541612.jpg",
                tag: "Featured",
              },
            ]}
          />
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <TrustBadges
            headline="A checkout flow that feels safe and effortless"
            subheadline="Sign in with Google, keep your cart synced, and track orders from your account."
            badges={[
              { title: "Google OAuth login", description: "One-tap sign-in with secure account linking." },
              { title: "Cart persistence", description: "Your cart follows you across sessions and devices." },
              { title: "Order history", description: "See past orders, statuses, and totals in your account." },
              { title: "Stock-aware catalog", description: "Add-to-cart respects inventory and prevents oversells." },
            ]}
            primaryCta={{ label: "Sign in with Google", href: "/login" }}
            secondaryCta={{ label: "View your cart", href: "/cart" }}
          />
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <TestimonialsGrid
            headline="Readers love the fast browsing experience"
            subheadline="Realistic seeded reviews to showcase layout density, ratings, and trust signals."
            testimonials={[
              {
                name: "Avery Chen",
                role: "Fantasy reader",
                quote: "The genre filters are spot-on. I found three new authors in under five minutes.",
                rating: 5,
                avatar:
                  "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577321/site-images/team-people/1181622.jpg",
              },
              {
                name: "Jordan Reyes",
                role: "Software engineer",
                quote:
                  "Search is fast, product pages are clean, and the cart stayed saved after I signed in with Google.",
                rating: 5,
                avatar:
                  "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577358/site-images/team-people/1181401.jpg",
              },
              {
                name: "Samira Khan",
                role: "Nonfiction fan",
                quote: "Love the stock labels—no surprises at checkout. The featured shelf is genuinely curated.",
                rating: 4,
                avatar:
                  "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577335/site-images/team-people/1181734.jpg",
              },
              {
                name: "Morgan Blake",
                role: "Mystery & thriller reader",
                quote: "The product detail page makes it easy to compare editions and see what’s in stock.",
                rating: 5,
                avatar:
                  "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577327/site-images/team-people/12899112.jpg",
              },
            ]}
          />
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <GalleryMasonry
            headline="Inside BookShop"
            subheadline="Curated visuals from our reading-first storefront experience."
            images={[
              {
                url: "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577110/site-images/ecommerce/17485350.jpg",
                alt: "Books on shelf",
                caption: "Fresh arrivals weekly",
              },
              {
                url: "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577152/site-images/ecommerce/11952304.jpg",
                alt: "Open book closeup",
                caption: "Curated editions",
              },
              {
                url: "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577158/site-images/ecommerce/10330120.jpg",
                alt: "Reader browsing catalog",
                caption: "Easy discovery",
              },
              {
                url: "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577128/site-images/ecommerce/16675634.jpg",
                alt: "Stack of novels",
                caption: "Genre picks",
              },
            ]}
          />
        </div>
      </section>

      <section className="py-20 md:py-28 animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <NewsletterForm
            headline="Get a monthly shelf—new arrivals and staff picks"
            subheadline="One email per month. No spam. Early access to featured drops from the seeded catalog as it grows."
            placeholder="you@domain.com"
            finePrint="By subscribing, you agree to receive BookShop emails. Unsubscribe anytime."
            primaryCta={{ label: "Subscribe", href: "/#newsletter" }}
            secondaryCta={{ label: "Browse new arrivals", href: "/catalog?sort=created_desc" }}
          />
        </div>
      </section>
    </main>
  )
}
