export const dynamic = 'force-dynamic';

import CartDrawer from '@/components/CartDrawer'
import CartLineItem from '@/components/CartLineItem'
import CartSummary from '@/components/CartSummary'
import CTAVortex from '@/components/CTAVortex'

export default function CartPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Your cart</h1>
          <p className="mt-4 text-muted-foreground">Review items, adjust quantities, and proceed to checkout-ready flow.</p>
        </div>
      </section>
      <section className="animate-fade-in-up py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <CartLineItem />
            <CartLineItem />
          </div>
          <CartSummary />
        </div>
      </section>
      <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <CartDrawer />
        </div>
      </section>
      <section className="animate-fade-in-up py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4">
          <CTAVortex
            title="Want to keep this cart for later?"
            subtitle="Sign in with Google to sync your cart and view order history."
            ctaLabel="Continue with Google"
            ctaHref="/login"
            secondaryCtaLabel="Checkout as guest (limited)"
            secondaryCtaHref="/checkout"
          />
        </div>
      </section>
    </div>
  )
}
