'use client';

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Spinner from '@/components/ui/Spinner';
import { api } from '@/lib/api';
import type { Book } from '@/types';

interface BookResponse {
  items: Book[];
  total: number;
  page: number;
  limit: number;
}

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ q: '', author: '', isbn: '', category: '' });
  const [activeFilters, setActiveFilters] = useState({ q: '', author: '', isbn: '', category: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 6;

  const totalPages = useMemo(() => Math.max(1, Math.ceil(total / limit)), [total, limit]);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams();
        if (activeFilters.q) params.set('q', activeFilters.q);
        if (activeFilters.author) params.set('author', activeFilters.author);
        if (activeFilters.isbn) params.set('isbn', activeFilters.isbn);
        if (activeFilters.category) params.set('category', activeFilters.category);
        params.set('page', String(page));
        params.set('limit', String(limit));

        const data = await api.get<BookResponse>(`/api/books?${params.toString()}`);
        setBooks(data?.items ?? []);
        setTotal(data?.total ?? 0);
      } catch (_error) {
        setError('Unable to load books right now.');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [activeFilters, page, limit]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActiveFilters(filters);
    setPage(1);
  };

  return (
    <main className="bg-white">
      <section className="bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-16 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="space-y-6">
              <p className="text-sm font-semibold uppercase tracking-wide text-secondary">ShelfMarket</p>
              <h1 className="text-4xl font-bold text-foreground md:text-5xl">
                Discover rare finds and sell your collection in one marketplace
              </h1>
              <p className="text-lg text-secondary">
                ShelfMarket powers modern book commerce with a seeded catalog, Google sign-in, and Unsplash-ready
                cover imagery. Shop trusted listings or launch your own storefront in minutes.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button>Browse catalog</Button>
                <Button variant="outline">Start selling</Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-md border border-border bg-white shadow-sm">
              <Image
                src="/images/hero.jpg"
                alt="Stacked books in a modern bookstore"
                width={1200}
                height={675}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 md:px-6">
        <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-foreground">Search the seeded catalog</h2>
            <p className="text-secondary">
              Filter by title, author, ISBN, or category to find the right listing for your next read.
            </p>
            <div className="overflow-hidden rounded-md border border-border">
              <Image
                src="/images/feature.jpg"
                alt="Curated book feature collection"
                width={1200}
                height={675}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <form onSubmit={submitSearch} className="grid gap-4 rounded-md border border-border bg-white p-6 shadow-sm">
            <Input
              label="Search by title"
              value={filters.q}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFilters((prev) => ({ ...prev, q: event.target.value }))
              }
              placeholder="e.g. The Great Gatsby"
            />
            <div className="grid gap-4 md:grid-cols-2">
              <Input
                label="Author"
                value={filters.author}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setFilters((prev) => ({ ...prev, author: event.target.value }))
                }
                placeholder="e.g. James Baldwin"
              />
              <Input
                label="ISBN"
                value={filters.isbn}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setFilters((prev) => ({ ...prev, isbn: event.target.value }))
                }
                placeholder="978-1234567890"
              />
            </div>
            <Input
              label="Category"
              value={filters.category}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFilters((prev) => ({ ...prev, category: event.target.value }))
              }
              placeholder="Fiction, Business, Mystery"
            />
            <Button type="submit">Apply filters</Button>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-foreground">Featured listings</h3>
            <p className="text-sm text-secondary">Fresh picks from the catalog ready to ship.</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-secondary">
            Page {page} of {totalPages}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Spinner className="h-8 w-8" />
          </div>
        ) : error ? (
          <Card className="mt-6">
            <CardContent className="text-sm text-secondary">{error}</CardContent>
          </Card>
        ) : books.length === 0 ? (
          <Card className="mt-6">
            <CardContent className="text-sm text-secondary">
              No books found. Try adjusting your filters.
            </CardContent>
          </Card>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => {
              const bookId = book.id ?? '';
              return (
                <Card key={bookId || book.title} className="flex h-full flex-col">
                  <div className="overflow-hidden rounded-md border border-border">
                    <Image
                      src="/images/feature.jpg"
                      alt={book.title ? `${book.title} cover` : 'Book cover'}
                      width={1200}
                      height={675}
                      className="h-40 w-full object-cover"
                    />
                  </div>
                  <CardHeader className="text-base font-semibold text-foreground">
                    {book.title || 'Untitled'}
                  </CardHeader>
                  <CardContent>
                    {book.author || 'Unknown author'} · {book.publisher || 'Independent'}
                  </CardContent>
                  <CardFooter>
                    <span className="text-sm text-secondary">Curated sellers</span>
                    <Link href={bookId ? `/book/${bookId}` : '/'}>
                      <Button size="sm" disabled={!bookId}>
                        View details
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}

        <div className="mt-8 flex items-center justify-between">
          <Button variant="outline" disabled={page <= 1} onClick={() => setPage((prev) => Math.max(1, prev - 1))}>
            Previous
          </Button>
          <Button
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          >
            Next
          </Button>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-16 md:px-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: 'Seller dashboards',
                description: 'Track sales, active listings, and recent orders from one workspace.'
              },
              {
                title: 'Smart reviews',
                description: 'Collect ratings and feedback from verified purchases.'
              },
              {
                title: 'Unsplash imagery',
                description: 'Attach high-quality covers with attribution for every listing.'
              },
              {
                title: 'Secure checkout',
                description: 'Buyers can complete checkout with clear pricing and order status updates.'
              }
            ].map((feature) => (
              <Card key={feature.title}>
                <CardHeader className="font-semibold text-foreground">{feature.title}</CardHeader>
                <CardContent>{feature.description}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted">
        <div className="mx-auto max-w-6xl px-4 py-14 md:px-6">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-foreground">Ready to open your virtual bookshelf?</h3>
              <p className="text-secondary">
                Sign in with Google to unlock listing tools, seller insights, and a growing community of readers.
              </p>
              <Button>Sign in to get started</Button>
            </div>
            <div className="overflow-hidden rounded-md border border-border bg-white shadow-sm">
              <Image
                src="/images/cta.jpg"
                alt="Reading nook with books"
                width={1200}
                height={675}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
