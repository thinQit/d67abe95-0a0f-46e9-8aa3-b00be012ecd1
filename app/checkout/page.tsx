export const dynamic = 'force-dynamic';

import CheckoutForm from "@/components/CheckoutForm"

export default function CheckoutPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="py-20 md:py-28 animate-fade-in-up">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">Checkout</h1>
          <p className="mt-4 text-muted-foreground">
            Checkout-ready account flows with Google sign-in, address capture, and order creation.
          </p>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-card animate-fade-in-up">
        <div className="mx-auto max-w-4xl px-4 md:px-6">
          <CheckoutForm
            headline="Shipping details"
            subheadline="Collect shipping info and create an order from the cart."
            fields={[
              "Full name",
              "Email",
              "Phone (optional)",
              "Address line 1",
              "Address line 2 (optional)",
              "City",
              "State/Region",
              "Postal code",
              "Country",
            ]}
          />
        </div>
      </section>
    </main>
  )
}
