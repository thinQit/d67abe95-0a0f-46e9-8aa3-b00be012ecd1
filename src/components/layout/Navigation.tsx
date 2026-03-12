'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { useAuth } from '@/providers/AuthProvider';

const routes = [
  { href: '/', label: 'Catalog' },
  { href: '/listings/new', label: 'Create Listing' },
  { href: '/seller/dashboard', label: 'Seller Dashboard' },
  { href: '/cart', label: 'Cart' },
  { href: '/profile', label: 'Profile' },
  { href: '/admin/seed', label: 'Admin Seed' }
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const { isAuthenticated, loginWithGoogle, logout } = useAuth();

  return (
    <nav className="border-b border-border bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
        <Link href="/" className="text-xl font-semibold text-foreground">
          ShelfMarket
        </Link>
        <button
          aria-label="Toggle menu"
          className="md:hidden rounded-md border border-border p-2"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="block h-0.5 w-5 bg-foreground" />
          <span className="mt-1 block h-0.5 w-5 bg-foreground" />
        </button>
        <div className="hidden items-center gap-6 md:flex">
          {routes.map((route) => (
            <Link key={route.href} href={route.href} className="text-sm text-secondary hover:text-foreground">
              {route.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <button onClick={logout} className="text-sm font-medium text-primary">
              Sign Out
            </button>
          ) : (
            <button onClick={loginWithGoogle} className="text-sm font-medium text-primary">
              Sign In
            </button>
          )}
        </div>
      </div>
      <div className={cn('md:hidden', open ? 'block' : 'hidden')}>
        <div className="space-y-2 border-t border-border px-4 py-4">
          {routes.map((route) => (
            <Link key={route.href} href={route.href} className="block text-sm text-secondary">
              {route.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <button onClick={logout} className="text-sm font-medium text-primary">
              Sign Out
            </button>
          ) : (
            <button onClick={loginWithGoogle} className="text-sm font-medium text-primary">
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
