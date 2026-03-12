'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import api from '@/lib/api';
import type { Order } from '@/types';

interface Summary {
  totalSales: number;
  activeListings: number;
  recentOrders: Order[];
}

export default function SellerDashboardPage() {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get<{ summary: Summary }>('/api/dashboard/seller');
        setSummary(data?.summary ?? null);
      } catch (_error) {
        setError('Unable to load seller dashboard.');
        setSummary(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-foreground">Seller dashboard</h1>
      <p className="mt-2 text-secondary">Monitor active listings, sales, and recent orders.</p>

      {loading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner className="h-8 w-8" />
        </div>
      ) : error ? (
        <Card className="mt-6">
          <CardContent className="text-sm text-secondary">{error}</CardContent>
        </Card>
      ) : (
        <>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader className="text-sm font-medium text-secondary">Total sales</CardHeader>
              <CardContent className="text-2xl font-semibold text-foreground">
                ${summary?.totalSales?.toFixed(2) ?? '0.00'}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="text-sm font-medium text-secondary">Active listings</CardHeader>
              <CardContent className="text-2xl font-semibold text-foreground">
                {summary?.activeListings ?? 0}
              </CardContent>
            </Card>
          </div>
          <section className="mt-8">
            <h2 className="text-xl font-semibold text-foreground">Recent orders</h2>
            {summary?.recentOrders?.length ? (
              <div className="mt-4 grid gap-3">
                {summary.recentOrders.map((order) => (
                  <Card key={order.id}>
                    <CardHeader className="text-sm font-medium text-foreground">Order {order.id}</CardHeader>
                    <CardContent className="text-sm text-secondary">
                      <p>Status: {order.status}</p>
                      <p>Total: ${order.totalPrice.toFixed(2)}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="mt-4">
                <CardContent className="text-sm text-secondary">No recent orders.</CardContent>
              </Card>
            )}
          </section>
        </>
      )}
    </main>
  );
}
