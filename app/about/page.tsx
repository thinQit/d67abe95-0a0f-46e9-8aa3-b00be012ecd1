export const dynamic = 'force-dynamic';

import FeaturesCards3D from '@/components/FeaturesCards3D'
import GalleryMasonry from '@/components/GalleryMasonry'

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold">A bookstore experience designed for clarity</h1>
          <p className="mt-4 text-muted-foreground text-base md:text-lg">
            BookShop focuses on fast discovery, trustworthy checkout flows, and inventory accuracy.
          </p>
        </div>
      </section>
      <section className="animate-fade-in-up py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <FeaturesCards3D
            title="What’s included in this update"
            subtitle="Customer storefront + Google OAuth + admin inventory and orders."
            features={[
              { icon: 'BookOpen', title: 'Seeded catalog', description: 'Genres, covers, ratings, and stock-aware inventory.' },
              { icon: 'Search', title: 'Search & filters', description: 'Find books fast by title, author, and genre.' },
              { icon: 'Shield', title: 'OAuth + checkout', description: 'Google sign-in, cart persistence, and checkout-ready flow.' },
            ]}
          />
        </div>
      </section>
      <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <GalleryMasonry
            headline="Built for real storefront workflows"
            images={[
              { url: 'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577128/site-images/ecommerce/16675634.jpg', alt: 'Bookshelf scene' },
              { url: 'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577104/site-images/ecommerce/29502364.jpg', alt: 'Modern marketplace interface' },
              { url: 'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577136/site-images/ecommerce/16675632.jpg', alt: 'Checkout flow' },
              { url: 'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577149/site-images/ecommerce/10223868.jpg', alt: 'Catalog management' },
            ]}
          />
        </div>
      </section>
    </div>
  )
}
