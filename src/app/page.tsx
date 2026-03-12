'use client';

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Spinner from '@/components/ui/Spinner';
import api from '@/lib/api';
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
  }, [activeFilters, page]);

  const submitFilters = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setActiveFilters(filters);
    setPage(1);
  };

  return (
    <main className="mx-auto max-w-6xl px-4 py-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground">ShelfMarket</h1>
          <p className="mt-2 text-secondary">Discover and list pre-loved books from verified sellers.</p>
        </div>
        <div className="overflow-hidden rounded-lg border border-border bg-white">
          <Image src="/images/hero.jpg" alt="Books" width={420} height={240} />
        </div>
      </div>

      <Card className="mt-8">
        <CardHeader className="text-sm font-medium text-secondary">Search catalog</CardHeader>
        <CardContent>
          <form onSubmit={submitFilters} className="grid gap-4 md:grid-cols-4">
            <Input
              label="Keyword"
              value={filters.q}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFilters((prev) => ({ ...prev, q: event.target.value }))
              }
            />
            <Input
              label="Author"
              value={filters.author}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFilters((prev) => ({ ...prev, author: event.target.value }))
              }
            />
            <Input
              label="ISBN"
              value={filters.isbn}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFilters((prev) => ({ ...prev, isbn: event.target.value }))
              }
            />
            <Input
              label="Category"
              value={filters.category}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setFilters((prev) => ({ ...prev, category: event.target.value }))
              }
            />
            <Button type="submit" className="md:col-span-4">
              Apply filters
            </Button>
          </form>
        </CardContent>
      </Card>

      <section className="mt-8">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Spinner className="h-8 w-8" />
          </div>
        ) : error ? (
          <Card>
            <CardContent className="text-sm text-secondary">{error}</CardContent>
          </Card>
        ) : books.length === 0 ? (
          <Card>
            <CardContent className="text-sm text-secondary">No books found.</CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <Card key={book.id}>
                <CardHeader className="text-sm font-medium text-foreground">{book.title}</CardHeader>
                <CardContent className="text-sm text-secondary">
                  <p>{book.author}</p>
                  <p className="mt-1 line-clamp-2">{book.description}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild size="sm">
                    <Link href={`/book/${book.id}`}>View details</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      <div className="mt-8 flex items-center justify-center gap-4">
        <Button variant="outline" onClick={() => setPage((prev) => Math.max(1, prev - 1))} disabled={page <= 1}>
          Previous
        </Button>
        <span className="text-sm text-secondary">
          Page {page} of {totalPages}
        </span>
        <Button
          variant="outline"
          onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
          disabled={page >= totalPages}
        >
          Next
        </Button>
      </div>
    </main>
  );
}
