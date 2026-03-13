export const dynamic = 'force-dynamic';

import ProtectedRoute from '@/components/ProtectedRoute'
import EmptyState from '@/components/EmptyState'

export default function OrdersPage() {
  return (
    <ProtectedRoute>
      <div className="bg-background text-foreground">
        <section className="animate-fade-in-up py-20 md:py-28 bg-muted/40">
          <div className="mx-auto max-w-7xl px-4">
            <h1 className="text-4xl md:text-6xl font-bold">Your orders</h1>
            <p className="mt-4 text-muted-foreground">Track status and review past purchases. Sign in required.</p>
          </div>
        </section>
        <section className="animate-fade-in-up py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4">
            <EmptyState title="No orders yet" description="When you place your first order, it will appear here." />
          </div>
        </section>
      </div>
    </ProtectedRoute>
  )
}
