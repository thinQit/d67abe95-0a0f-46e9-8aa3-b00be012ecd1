'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import Card, { CardContent } from '@/components/ui/Card';
import { api } from '@/lib/api';

export default function AdminSeedPage() {
  const [message, setMessage] = useState('');
  const [loadingCatalog, setLoadingCatalog] = useState(false);
  const [loadingImages, setLoadingImages] = useState(false);

  const seedBooks = async () => {
    setMessage('');
    setLoadingCatalog(true);
    try {
      const res = await api.post<{ seededCount: number; message?: string }>('/api/books/seed', {
        source: 'default'
      });
      setMessage(`Seeded ${res?.seededCount ?? 0} books. ${res?.message ?? ''}`.trim());
    } catch (_error) {
      setMessage('Failed to seed catalog.');
    } finally {
      setLoadingCatalog(false);
    }
  };

  const seedImages = async () => {
    setMessage('');
    setLoadingImages(true);
    try {
      const res = await api.post<{ matched: number; skipped: number }>('/api/admin/seed/images', {
        strategy: 'matchByTitle'
      });
      setMessage(`Matched ${res?.matched ?? 0} images, skipped ${res?.skipped ?? 0}.`);
    } catch (_error) {
      setMessage('Failed to seed images.');
    } finally {
      setLoadingImages(false);
    }
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-foreground">Admin seed tools</h1>
      <p className="mt-2 text-secondary">Trigger idempotent catalog and image seed jobs.</p>

      <Card className="mt-6">
        <CardContent className="flex flex-col gap-3">
          <Button onClick={seedBooks} disabled={loadingCatalog}>
            {loadingCatalog ? 'Seeding catalog...' : 'Seed catalog'}
          </Button>
          <Button variant="outline" onClick={seedImages} disabled={loadingImages}>
            {loadingImages ? 'Seeding images...' : 'Seed Unsplash images'}
          </Button>
          {message && <p className="text-sm text-secondary">{message}</p>}
        </CardContent>
      </Card>
    </main>
  );
}
