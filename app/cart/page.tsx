export const dynamic = 'force-dynamic';

import CartTable from "@/components/CartTable"
import CTAVortex from "@/components/CTAVortex"

export default function CartPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="py-20 md:py-28 animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">Your cart</h1>
          <p className="mt-4 text-muted-foreground">
            Adjust quantities, see stock-aware totals, and proceed to checkout-ready flows.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CartTable />
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <CTAVortex
            title="Save your cart and track orders"
            subtitle="Sign in with Google to sync your cart and access order history."
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
