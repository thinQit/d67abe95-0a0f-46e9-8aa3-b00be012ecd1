export const dynamic = 'force-dynamic';

import ProtectedRoute from '@/components/ProtectedRoute'
import AdminSidebar from '@/components/AdminSidebar'
import StatsCounter from '@/components/StatsCounter'
import FeaturesCards3D from '@/components/FeaturesCards3D'

export default function AdminDashboardPage() {
  return (
    <ProtectedRoute>
      <div className="bg-background text-foreground">
        <section className="animate-fade-in-up py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-4 grid gap-6 lg:grid-cols-[280px_1fr]">
            <AdminSidebar />
            <div className="space-y-8">
              <h1 className="text-4xl md:text-6xl font-bold">Admin dashboard</h1>
              <StatsCounter
                stats={[
                  { label: 'Total SKUs', value: '48' },
                  { label: 'Low stock', value: '7' },
                  { label: 'Open orders', value: '3' },
                  { label: 'Featured', value: '8' },
                ]}
              />
              <FeaturesCards3D
                title="Quick actions"
                subtitle="Common workflows for keeping the storefront accurate."
                features={[
                  { icon: 'Package', title: 'Update stock', description: 'Adjust stock counts and prevent overselling.' },
                  { icon: 'Star', title: 'Toggle featured', description: 'Promote seasonal picks on the homepage.' },
                  { icon: 'Truck', title: 'Fulfill orders', description: 'Move orders from paid to fulfilled with notes.' },
                  { icon: 'SearchCheck', title: 'Catalog health', description: 'Spot missing covers, prices, or metadata.' },
                ]}
              />
            </div>
          </div>
        </section>
      </div>
    </ProtectedRoute>
  )
}
