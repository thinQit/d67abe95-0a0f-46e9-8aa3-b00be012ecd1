export const dynamic = 'force-dynamic';

import ProtectedRoute from '@/components/ProtectedRoute'
import AdminSidebar from '@/components/AdminSidebar'
import AdminTable from '@/components/AdminTable'

export default function AdminOrdersPage() {
  return (
    <ProtectedRoute>
      <div className="bg-background text-foreground">
        <section className="animate-fade-in-up py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 grid gap-6 lg:grid-cols-[280px_1fr]">
            <AdminSidebar />
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold">Order management</h1>
              <p className="text-muted-foreground">
                Review, update status, and fulfill orders created from checkout-ready flows.
              </p>
              <AdminTable title="Orders" />
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  )
}
