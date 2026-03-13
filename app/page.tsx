export const dynamic = 'force-dynamic';

import HeroSpotlight from '@/components/HeroSpotlight'
import CategoryNav from '@/components/CategoryNav'
import ProductGrid from '@/components/ProductGrid'
import TrustBadges from '@/components/TrustBadges'
import TestimonialsGrid from '@/components/TestimonialsGrid'
import NewsletterForm from '@/components/NewsletterForm'
import StatsCounter from '@/components/StatsCounter'
import GalleryMasonry from '@/components/GalleryMasonry'
import CTAVortex from '@/components/CTAVortex'

export default function HomePage() {
  return (
    <div className="bg-background text-foreground">
      <section className="animate-fade-in-up">
        <HeroSpotlight
          title="Find your next great read—fast."
          subtitle="Browse curated, seeded titles across Fiction, Fantasy, Business, and more. Save your cart, sign in with Google, and check out when you’re ready."
          primaryCta={{ label: 'Shop the catalog', href: '/catalog' }}
          secondaryCta={{ label: 'Explore genres', href: '/catalog?genre=Fiction' }}
        />
      </section>

      <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <StatsCounter
            stats={[
              { label: 'Seeded titles', value: '48' },
              { label: 'Genres', value: '10' },
              { label: 'Avg. rating', value: '4.6/5' },
            ]}
            bgColor="bg-card"
          />
        </div>
      </section>

      <section className="animate-fade-in-up py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <CategoryNav
            headline="Shop by genre"
            subheadline="Jump straight into what you love—then refine with filters and search."
            categories={[
              { name: 'Fiction', href: '/catalog?genre=Fiction', count: 10 },
              { name: 'Fantasy', href: '/catalog?genre=Fantasy', count: 6 },
              { name: 'Mystery & Thriller', href: '/catalog?genre=Mystery%20%26%20Thriller', count: 5 },
              { name: 'Business', href: '/catalog?genre=Business', count: 6 },
              { name: 'Self-Improvement', href: '/catalog?genre=Self-Improvement', count: 5 },
              { name: 'Technology', href: '/catalog?genre=Technology', count: 6 },
              { name: 'History', href: '/catalog?genre=History', count: 4 },
              { name: 'Biography', href: '/catalog?genre=Biography', count: 6 },
            ]}
            primaryCta={{ label: 'View all genres', href: '/catalog' }}
            secondaryCta={{ label: 'See featured', href: '/catalog?featured=true' }}
          />
        </div>
      </section>

      <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <ProductGrid
            headline="Featured books readers keep recommending"
            subheadline="A rotating set of seeded bestsellers and staff picks—always in stock (until it isn’t)."
            products={[
              {
                slug: 'atomic-habits',
                title: 'Atomic Habits',
                author: 'James Clear',
                genre: 'Self-Improvement',
                price: 18.99,
                compareAtPrice: 22.99,
                rating: 4.8,
                reviewCount: 3124,
                badge: 'Bestseller',
                imageUrl:
                  'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577111/site-images/ecommerce/3767397.jpg',
              },
              {
                slug: 'dune',
                title: 'Dune',
                author: 'Frank Herbert',
                genre: 'Fantasy',
                price: 16.5,
                compareAtPrice: 19,
                rating: 4.7,
                reviewCount: 2450,
                badge: 'Epic',
                imageUrl:
                  'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577129/site-images/ecommerce/16675635.jpg',
              },
              {
                slug: 'the-pragmatic-programmer',
                title: 'The Pragmatic Programmer',
                author: 'Andrew Hunt, David Thomas',
                genre: 'Technology',
                price: 39,
                compareAtPrice: 45,
                rating: 4.9,
                reviewCount: 980,
                badge: 'Classic',
                imageUrl:
                  'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577164/site-images/ecommerce/11952301.jpg',
              },
              {
                slug: 'educated',
                title: 'Educated',
                author: 'Tara Westover',
                genre: 'Biography',
                price: 14.99,
                compareAtPrice: 18.99,
                rating: 4.6,
                reviewCount: 2105,
                badge: 'Staff pick',
                imageUrl:
                  'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577126/site-images/ecommerce/259200.jpg',
              },
            ]}
          />
        </div>
      </section>

      <section className="animate-fade-in-up py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <TrustBadges
            headline="Checkout-ready, secure, and built for speed"
            subheadline="Google sign-in, persistent carts, and an admin inventory workflow—so the store stays accurate."
            badges={[
              { title: 'Google OAuth', description: 'One-tap sign-in via NextAuth with Google provider.' },
              { title: 'Persistent cart', description: 'Cart saved to your account when signed in; local fallback when signed out.' },
              { title: 'Inventory-aware', description: 'Stock levels enforced on add-to-cart and checkout flows.' },
              { title: 'Order tracking', description: 'Order history for customers and order management for admins.' },
            ]}
          />
        </div>
      </section>

      <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <TestimonialsGrid
            headline="Readers love the clean browsing experience"
            subheadline="Seeded reviews to showcase layout, typography, and trust signals."
            testimonials={[
              { name: 'Maya R.', title: 'Avid reader', quote: 'The genre filters are spot on. I found three new favorites in under five minutes.' },
              { name: 'Daniel K.', title: 'Tech lead', quote: 'Fast search, clean product pages, and the cart just stays put across devices after Google sign-in.' },
              { name: 'Sofia L.', title: 'Book club organizer', quote: 'Featured picks make it easy to choose our monthly read. Love the staff pick badges.' },
              { name: 'Ethan P.', title: 'Busy parent', quote: 'Simple checkout-ready flow and clear stock messaging—no surprises at the end.' },
            ]}
          />
        </div>
      </section>

      <section className="animate-fade-in-up py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <GalleryMasonry
            headline="Inside the BookShop experience"
            subheadline="A polished, visual-first browsing and checkout journey."
            images={[
              { url: 'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577158/site-images/ecommerce/29502357.jpg', alt: 'Book browsing' },
              { url: 'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577106/site-images/ecommerce/15195243.jpg', alt: 'Reading corner' },
              { url: 'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577154/site-images/ecommerce/10330119.jpg', alt: 'Book cart' },
              { url: 'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577110/site-images/ecommerce/17485350.jpg', alt: 'Shelf detail' },
              { url: 'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577152/site-images/ecommerce/11952304.jpg', alt: 'Checkout process' },
              { url: 'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577132/site-images/ecommerce/16675631.jpg', alt: 'New arrivals display' },
            ]}
          />
        </div>
      </section>

      <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <NewsletterForm
            headline="Get monthly staff picks and new arrivals"
            subheadline="One email a month. No spam. Unsubscribe anytime."
            placeholder="you@domain.com"
            ctaLabel="Subscribe"
            privacyNote="We’ll only use your email to send BookShop updates."
          />
        </div>
      </section>

      <section className="animate-fade-in-up py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4">
          <CTAVortex
            title="Ready to start your next chapter?"
            subtitle="Search, filter, and add your next favorite reads in minutes."
            ctaLabel="Browse all books"
            ctaHref="/catalog"
            secondaryCtaLabel="View cart"
            secondaryCtaHref="/cart"
          />
        </div>
      </section>
    </div>
  )
}
