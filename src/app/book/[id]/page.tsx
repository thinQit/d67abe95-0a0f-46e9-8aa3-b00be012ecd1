'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import Card, { CardContent, CardHeader } from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import { api } from '@/lib/api';
import type { Book, Listing, Review } from '@/types';

interface BookDetailsResponse {
  book: Book;
  listings: Listing[];
  reviews: Review[];
}

export default function BookDetailsPage() {
  const params = useParams();
  const id = params?.id as string | undefined;
  const [book, setBook] = useState<Book | null>(null);
  const [listings, setListings] = useState<Listing[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await api.get<BookDetailsResponse>(`/api/books/${id}`);
        setBook(data?.book ?? null);
        setListings(data?.listings ?? []);
        setReviews(data?.reviews ?? []);
      } catch (_error) {
        setError('Unable to load book details.');
        setBook(null);
        setListings([]);
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const averageRating = useMemo(() => {
    if (!reviews.length) return 'N/A';
    const total = reviews.reduce((sum, review) => sum + (review.rating ?? 0), 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4">
        <Spinner className="h-8 w-8" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Card>
          <CardHeader className="text-lg font-semibold text-foreground">Book details</CardHeader>
          <CardContent className="text-sm text-secondary">{error}</CardContent>
        </Card>
      </main>
    );
  }

  if (!book) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Card>
          <CardContent className="text-sm text-secondary">Book not found.</CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
        <div className="overflow-hidden rounded-md border border-border bg-white shadow-sm">
          <Image
            src="/images/feature.jpg"
            alt={book.title ? `${book.title} cover` : 'Book cover'}
            width={1200}
            height={675}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-3xl font-semibold text-foreground">{book.title || 'Untitled'}</h1>
          <p className="mt-2 text-secondary">{book.author || 'Unknown author'}</p>
          <p className="mt-4 text-sm text-secondary">{book.description || 'No description available.'}</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="text-sm text-secondary">ISBN: {book.isbn || 'N/A'}</div>
            <div className="text-sm text-secondary">Publisher: {book.publisher || 'N/A'}</div>
            <div className="text-sm text-secondary">Language: {book.language || 'N/A'}</div>
            <div className="text-sm text-secondary">Pages: {book.pages ?? 'N/A'}</div>
            <div className="text-sm text-secondary">
              Published: {book.publishedDate ? new Date(book.publishedDate).toLocaleDateString() : 'N/A'}
            </div>
            <div className="text-sm text-secondary">Average rating: {averageRating}</div>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => setMessage('Added to cart. Continue to checkout when ready.')}>Add to cart</Button>
            {message && <span className="text-sm text-secondary">{message}</span>}
          </div>
        </div>
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground">Active listings</h2>
        {listings.length === 0 ? (
          <Card className="mt-4">
            <CardContent className="text-sm text-secondary">No listings available yet.</CardContent>
          </Card>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {listings.map((listing) => (
              <Card key={listing.id}>
                <CardHeader className="text-base font-semibold text-foreground">
                  Condition: {listing.condition || 'N/A'}
                </CardHeader>
                <CardContent>
                  <div>Price: ${listing.price?.toFixed(2) ?? '0.00'}</div>
                  <div>Stock: {listing.stock ?? 0}</div>
                  <div>Status: {listing.status || 'active'}</div>
                  <div>
                    Listed: {listing.createdAt ? new Date(listing.createdAt).toLocaleDateString() : 'N/A'}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold text-foreground">Reviews</h2>
        {reviews.length === 0 ? (
          <Card className="mt-4">
            <CardContent className="text-sm text-secondary">No reviews yet.</CardContent>
          </Card>
        ) : (
          <div className="mt-4 space-y-3">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader className="text-base font-semibold text-foreground">
                  Rating: {review.rating ?? 0} / 5
                </CardHeader>
                <CardContent>
                  <p>{review.comment || 'No comment provided.'}</p>
                  <p className="mt-2 text-xs text-secondary">
                    {review.createdAt ? new Date(review.createdAt).toLocaleDateString() : 'N/A'}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
