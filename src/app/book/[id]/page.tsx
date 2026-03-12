'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import Spinner from '@/components/ui/Spinner';
import api from '@/lib/api';
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

  const addToCart = async (listingId?: string) => {
    if (!listingId) return;
    setMessage('');
    try {
      await api.post('/api/cart', { listingId, quantity: 1 });
      setMessage('Listing added to cart.');
    } catch (_error) {
      setMessage('Unable to add to cart.');
    }
  };

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
          <CardContent className="text-sm text-secondary">{error}</CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="overflow-hidden rounded-lg border border-border bg-white">
          <Image
            src={book?.coverImageUrl || '/images/placeholder.jpg'}
            alt={book?.title || 'Book cover'}
            width={800}
            height={1100}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold text-foreground">{book?.title}</h1>
            <p className="mt-2 text-secondary">{book?.author}</p>
          </div>
          <Card>
            <CardHeader className="text-sm font-medium text-secondary">Summary</CardHeader>
            <CardContent className="space-y-2 text-sm text-secondary">
              <p>{book?.description || 'No description available.'}</p>
              <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                {book?.publisher && <span>Publisher: {book.publisher}</span>}
                {book?.isbn && <span>ISBN: {book.isbn}</span>}
                <span>Rating: {averageRating}</span>
              </div>
            </CardContent>
          </Card>
          {message && <p className="text-sm text-secondary">{message}</p>}
        </div>
      </div>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Listings</h2>
        {listings.length === 0 ? (
          <Card>
            <CardContent className="text-sm text-secondary">No active listings yet.</CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {listings.map((listing) => (
              <Card key={listing.id}>
                <CardContent className="space-y-2">
                  <p className="text-sm text-secondary">Condition: {listing.condition}</p>
                  <p className="text-lg font-semibold text-foreground">${listing.price.toFixed(2)}</p>
                  <Button size="sm" onClick={() => addToCart(listing.id)}>
                    Add to cart
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Reviews</h2>
        {reviews.length === 0 ? (
          <Card>
            <CardContent className="text-sm text-secondary">No reviews yet.</CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="text-sm text-secondary">
                  <p className="font-medium text-foreground">Rating: {review.rating}</p>
                  <p>{review.comment || 'No comment provided.'}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
