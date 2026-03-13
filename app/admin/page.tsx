export const dynamic = 'force-dynamic';

import AdminSidebar from "@/components/AdminSidebar"
import AdminKpiCards from "@/components/AdminKpiCards"
import FeaturesGrid from "@/components/FeaturesGrid"

export default function AdminPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="py-20 md:py-28 animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          <AdminSidebar />
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold">Admin dashboard</h1>
            <p className="text-muted-foreground">
              Manage inventory, featured books, and orders from a single place.
            </p>
            <AdminKpiCards
              kpis={[
                { label: "Total titles", value: "48" },
                { label: "Low stock", value: "6" },
                { label: "Featured", value: "8" },
                { label: "Orders (30d)", value: "42" },
              ]}
            />
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28 bg-muted animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <FeaturesGrid
            headline="Quick actions"
            subheadline="Common tasks for keeping the storefront fresh and accurate."
            features={[
              { icon: "Sparkles", title: "Toggle featured", description: "Promote seasonal picks on the homepage." },
              { icon: "Boxes", title: "Adjust stock", description: "Update quantities to prevent overselling." },
              { icon: "BadgeDollarSign", title: "Update pricing", description: "Run promotions with clear price changes." },
              { icon: "ClipboardList", title: "Manage orders", description: "Move orders through statuses and record tracking." },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
