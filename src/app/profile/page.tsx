'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import api from '@/lib/api';
import type { Order } from '@/types';

interface OrdersResponse {
  items: Order[];
  total: number;
}

export default function ProfilePage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get<OrdersResponse>('/api/orders');
        setOrders(data?.items ?? []);
      } catch (_error) {
        setError('Unable to load orders right now.');
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-foreground">Profile</h1>
      <p className="mt-2 text-secondary">Track your orders, wishlist, and account preferences.</p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold text-foreground">Recent orders</h2>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner className="h-6 w-6" />
          </div>
        ) : error ? (
          <Card className="mt-4">
            <CardContent className="text-sm text-secondary">{error}</CardContent>
          </Card>
        ) : orders.length === 0 ? (
          <Card className="mt-4">
            <CardContent className="text-sm text-secondary">No orders yet.</CardContent>
          </Card>
        ) : (
          <div className="mt-4 grid gap-3">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="text-sm font-medium text-foreground">Order {order.id}</CardHeader>
                <CardContent className="text-sm text-secondary">
                  <p>Status: {order.status}</p>
                  <p>Total: ${order.totalPrice.toFixed(2)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
