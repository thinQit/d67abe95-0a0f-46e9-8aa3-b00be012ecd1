export const dynamic = 'force-dynamic';

import AdminSidebar from "@/components/AdminSidebar"
import AdminInventoryTable from "@/components/AdminInventoryTable"

export default function AdminInventoryPage() {
  return (
    <main className="bg-background text-foreground">
      <section className="py-20 md:py-28 animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6 grid gap-6 lg:grid-cols-[260px_1fr]">
          <AdminSidebar />
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Inventory management</h1>
            <p className="text-muted-foreground">
              Edit seeded catalog items, update stock, and control what’s featured on the storefront.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28 bg-card animate-fade-in-up">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <AdminInventoryTable />
        </div>
      </section>
    </main>
  )
}
