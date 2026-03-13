export const dynamic = 'force-dynamic';

import ProtectedRoute from '@/components/ProtectedRoute'
import AdminSidebar from '@/components/AdminSidebar'
import AdminTable from '@/components/AdminTable'

export default function AdminInventoryPage() {
  return (
    <ProtectedRoute>
      <div className="bg-background text-foreground">
        <section className="animate-fade-in-up py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 grid gap-6 lg:grid-cols-[280px_1fr]">
            <AdminSidebar />
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">Inventory management</h1>
              <p className="text-muted-foreground">Edit seeded catalog metadata, stock, and featured status.</p>
              <AdminTable title="Catalog" />
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  )
}
