export const dynamic = 'force-dynamic';

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function CheckoutPage() {
  return (
    <div className="bg-background text-foreground">
      <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
        <div className="mx-auto max-w-7xl px-4">
          <h1 className="text-4xl md:text-6xl font-bold">Checkout</h1>
          <p className="mt-4 text-muted-foreground">
            A checkout-ready flow with account sign-in, shipping details, and order creation.
          </p>
        </div>
      </section>
      <section className="animate-fade-in-up py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-4">
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-semibold">Shipping details</h2>
            <p className="text-muted-foreground mt-2">Used to create an order record and support fulfillment workflows.</p>
            <div className="mt-6">
              <Button className="transition-all duration-200 hover:scale-105">Place order</Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
