'use client';

import { useState, type ChangeEvent } from 'react';
import Button from '@/components/ui/Button';
import Card, { CardContent } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import { api } from '@/lib/api';
import type { Order } from '@/types';

export default function CartPage() {
  const [listingId, setListingId] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const checkout = async () => {
    setMessage('');
    setLoading(true);
    try {
      const data = await api.post<{ order: Order }>('/api/orders', {
        items: [{ listingId, quantity: Number(quantity) }],
        paymentMethod: 'card'
      });
      setMessage(`Order ${data?.order?.id ?? ''} placed successfully.`);
    } catch (_error) {
      setMessage('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-foreground">Cart & checkout</h1>
      <p className="mt-2 text-secondary">Review your listing and complete checkout.</p>

      <Card className="mt-6">
        <CardContent className="space-y-4">
          <Input
            label="Listing ID"
            value={listingId}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setListingId(event.target.value)}
          />
          <Input
            label="Quantity"
            value={quantity}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setQuantity(event.target.value)}
          />
          <Button onClick={checkout} disabled={loading}>
            {loading ? 'Processing...' : 'Complete checkout'}
          </Button>
          {message && <p className="text-sm text-secondary">{message}</p>}
        </CardContent>
      </Card>
    </main>
  );
}
