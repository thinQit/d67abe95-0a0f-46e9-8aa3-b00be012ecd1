'use client';

import { useState, type ChangeEvent } from 'react';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Spinner from '@/components/ui/Spinner';
import api from '@/lib/api';

interface UnsplashResult {
  unsplashId: string;
  url: string;
  width: number;
  height: number;
  attribution?: string;
}

export default function CreateListingPage() {
  const [form, setForm] = useState({ bookId: '', price: '', condition: 'good', stock: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<UnsplashResult[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const submit = async () => {
    setMessage('');
    setLoading(true);
    try {
      await api.post<{ listing: { id: string } }>('/api/listings', {
        bookId: form.bookId,
        price: Number(form.price),
        condition: form.condition,
        stock: Number(form.stock)
      });
      setMessage('Listing created successfully.');
    } catch (_error) {
      setMessage('Failed to create listing.');
    } finally {
      setLoading(false);
    }
  };

  const searchUnsplash = async () => {
    setSearchLoading(true);
    setSearchError(null);
    try {
      const data = await api.post<{ results: UnsplashResult[] }>('/api/images/unsplash/search', {
        query: searchQuery,
        page: 1,
        per_page: 6
      });
      setResults(data?.results ?? []);
    } catch (_error) {
      setSearchError('Unable to search images right now.');
      setResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const attachImage = async (result: UnsplashResult) => {
    setMessage('');
    try {
      await api.post('/api/images/unsplash/attach', {
        bookId: form.bookId,
        unsplashId: result.unsplashId,
        url: result.url
      });
      setMessage('Image attached to listing.');
    } catch (_error) {
      setMessage('Failed to attach image.');
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-foreground">Create a new listing</h1>
      <p className="mt-2 text-secondary">Add pricing, condition, and stock before publishing.</p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <Card>
          <CardHeader className="text-sm font-medium text-secondary">Listing details</CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Book ID"
              value={form.bookId}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setForm((prev) => ({ ...prev, bookId: event.target.value }))
              }
            />
            <Input
              label="Price"
              value={form.price}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setForm((prev) => ({ ...prev, price: event.target.value }))
              }
            />
            <Input
              label="Condition"
              value={form.condition}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setForm((prev) => ({ ...prev, condition: event.target.value }))
              }
            />
            <Input
              label="Stock"
              value={form.stock}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setForm((prev) => ({ ...prev, stock: event.target.value }))
              }
            />
            <Button onClick={submit} disabled={loading}>
              {loading ? 'Saving...' : 'Create listing'}
            </Button>
            {message && <p className="text-sm text-secondary">{message}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-sm font-medium text-secondary">Unsplash search</CardHeader>
          <CardContent className="space-y-3">
            <Input
              label="Search query"
              value={searchQuery}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)}
            />
            <Button variant="outline" onClick={searchUnsplash} disabled={searchLoading}>
              {searchLoading ? 'Searching...' : 'Search images'}
            </Button>
            {searchLoading && (
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Spinner className="h-4 w-4" /> Loading results...
              </div>
            )}
            {searchError && <p className="text-sm text-destructive">{searchError}</p>}
            <div className="grid gap-3">
              {results.map((result) => (
                <div key={result.unsplashId} className="rounded-md border border-border p-3">
                  <p className="text-xs text-secondary">{result.attribution || 'Unsplash image'}</p>
                  <Button size="sm" className="mt-2" onClick={() => attachImage(result)}>
                    Attach image
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
