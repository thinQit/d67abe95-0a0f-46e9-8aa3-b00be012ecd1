export const dynamic = 'force-dynamic';

import ProductGallery from '@/components/ProductGallery'
import PriceTag from '@/components/PriceTag'
import RatingStars from '@/components/RatingStars'
import ProductGrid from '@/components/ProductGrid'

export default function BookDetailPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="animate-fade-in-up py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 md:grid-cols-2">
          <ProductGallery
            title="Book details"
            imageUrl="https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577128/site-images/ecommerce/32831065.jpg"
          />
          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold">Book details</h1>
            <p className="text-muted-foreground">Cover, synopsis, ratings, and stock-aware purchasing.</p>
            <PriceTag price={18.99} compareAtPrice={22.99} currency="USD" />
            <RatingStars rating={4.8} count={3124} />
          </div>
        </div>
      </section>
      <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="text-3xl font-bold">What you’ll get</h2>
          <p className="mt-3 text-muted-foreground">Clear details for confident buying decisions.</p>
        </div>
      </section>
      <section className="animate-fade-in-up py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <ProductGrid headline="You might also like" subheadline="More titles from the same genre and similar ratings." />
        </div>
      </section>
    </div>
  )
}
