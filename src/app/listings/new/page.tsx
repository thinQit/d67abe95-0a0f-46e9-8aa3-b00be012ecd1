'use client';

import { useState, type ChangeEvent } from 'react';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Spinner from '@/components/ui/Spinner';
import { api } from '@/lib/api';
import type { Image } from '@/types';

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
      await api.post<{ image: Image }>('/api/images/unsplash/select', {
        bookId: form.bookId || undefined,
        unsplashId: result.unsplashId,
        url: result.url,
        attribution: result.attribution
      });
      setMessage('Cover image attached to the book.');
    } catch (_error) {
      setMessage('Unable to attach image.');
    }
  };

  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-foreground">Create a listing</h1>
      <p className="mt-2 text-secondary">Publish inventory with condition, pricing, and optional Unsplash imagery.</p>

      <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_3fr]">
        <Card>
          <CardHeader className="text-lg font-semibold text-foreground">Listing details</CardHeader>
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
              placeholder="$18.00"
            />
            <div className="space-y-1">
              <label htmlFor="condition" className="text-sm font-medium text-foreground">
                Condition
              </label>
              <select
                id="condition"
                className="w-full rounded-md border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
                value={form.condition}
                onChange={(event: ChangeEvent<HTMLSelectElement>) =>
                  setForm((prev) => ({ ...prev, condition: event.target.value }))
                }
              >
                <option value="new">New</option>
                <option value="like new">Like new</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>
            <Input
              label="Stock quantity"
              value={form.stock}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setForm((prev) => ({ ...prev, stock: event.target.value }))
              }
            />
            <Button onClick={submit} disabled={loading}>
              {loading ? 'Creating...' : 'Create listing'}
            </Button>
            {message && <p className="text-sm text-secondary">{message}</p>}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-lg font-semibold text-foreground">Unsplash cover search</CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Search query"
              value={searchQuery}
              onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchQuery(event.target.value)}
              placeholder="Search for cover imagery"
            />
            <Button variant="outline" onClick={searchUnsplash} disabled={searchLoading}>
              {searchLoading ? 'Searching...' : 'Search Unsplash'}
            </Button>
            {searchLoading && (
              <div className="flex items-center gap-2 text-sm text-secondary">
                <Spinner className="h-4 w-4" />
                Searching imagery...
              </div>
            )}
            {searchError && <p className="text-sm text-secondary">{searchError}</p>}
            {results.length === 0 && !searchLoading ? (
              <p className="text-sm text-secondary">No results yet. Try a search query.</p>
            ) : (
              <div className="space-y-3">
                {results.map((result) => (
                  <Card key={result.unsplashId} className="border border-border">
                    <CardContent className="space-y-2">
                      <div className="text-sm font-medium text-foreground">Unsplash image</div>
                      <p className="text-xs text-secondary">
                        Attribution: {result.attribution || 'Unsplash contributor'}
                      </p>
                      <Button size="sm" onClick={() => attachImage(result)}>
                        Attach to book
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
