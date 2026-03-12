'use client';

import Image from 'next/image';
import Button from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { useAuth } from '@/providers/AuthProvider';

export default function SignInPage() {
  const { loginWithGoogle } = useAuth();

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-[1fr_1.2fr] md:items-center">
        <Card>
          <CardContent className="space-y-4">
            <h1 className="text-3xl font-semibold text-foreground">Sign in to ShelfMarket</h1>
            <p className="text-secondary">
              Use Google OAuth to access your buyer or seller account and manage listings, orders, and reviews.
            </p>
            <Button onClick={loginWithGoogle}>Continue with Google</Button>
          </CardContent>
        </Card>
        <div className="overflow-hidden rounded-md border border-border bg-white shadow-sm">
          <Image
            src="/images/cta.jpg"
            alt="Bookshelf with warm lighting"
            width={1200}
            height={675}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </main>
  );
}
