export const dynamic = 'force-dynamic';

import FeaturesGrid from "@/components/FeaturesGrid"

export default function OrdersPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="py-20 md:py-28 animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h1 className="text-4xl md:text-5xl font-bold">Your orders</h1>
          <p className="mt-4 text-muted-foreground">Track statuses, view totals, and revisit items you loved.</p>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-card animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <FeaturesGrid
            headline="Order history"
            subheadline="A clean list with order number, date, status, and total."
            features={[
              { icon: "Clock3", title: "Pending", description: "Order received and awaiting processing." },
              { icon: "PackageCheck", title: "Processing", description: "Packing and preparing shipment." },
              { icon: "Truck", title: "Shipped", description: "On the way with tracking updates." },
              { icon: "BadgeCheck", title: "Delivered", description: "Delivered successfully." },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
