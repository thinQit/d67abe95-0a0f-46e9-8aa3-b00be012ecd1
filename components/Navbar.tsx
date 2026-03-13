'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { BookOpen, Search, ShoppingCart, User, ChevronDown, LogIn, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface GenreOption {
  label: string
  value: string
}

interface NavbarProps {
  logo?: string
  navItems?: { label: string; href: string }[]
  cartCount?: number
  genres?: GenreOption[]
  selectedGenre?: string
  searchQuery?: string
  userName?: string
  userRole?: 'customer' | 'admin'
  onSearchChange?: (value: string) => void
  onGenreChange?: (value: string) => void
  onGoogleLogin?: () => void
  onSignOut?: () => void
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export default function Navbar({
  logo = 'BookShop',
  navItems = [
    { label: 'Home', href: '/' },
    { label: 'Catalog', href: '/catalog' },
    { label: 'Cart', href: '/cart' },
    { label: 'Orders', href: '/orders' },
    { label: 'Admin', href: '/admin' },
  ],
  cartCount = 0,
  genres = [
    { label: 'All Genres', value: 'all' },
    { label: 'Fantasy', value: 'fantasy' },
    { label: 'Sci-Fi', value: 'sci-fi' },
    { label: 'Mystery', value: 'mystery' },
    { label: 'Romance', value: 'romance' },
    { label: 'Non-fiction', value: 'non-fiction' },
  ],
  selectedGenre = 'all',
  searchQuery = '',
  userName,
  userRole = 'customer',
  onSearchChange = () => {},
  onGenreChange = () => {},
  onGoogleLogin = () => {},
  onSignOut = () => {},
  ctaLabel,
  ctaHref,
  className = '',
}: Partial<NavbarProps>) {
  const [accountOpen, setAccountOpen] = useState(false)
  const [genreOpen, setGenreOpen] = useState(false)

  const activeGenre = useMemo(() => genres.find((g) => g.value === selectedGenre) || genres[0], [genres, selectedGenre])

  // Close dropdowns on outside click/esc: left out for brevity, can add with useEffect if needed

  return (
    <header className={cn("sticky top-0 z-50 border-b bg-white/95 backdrop-blur", className)}>
      <div className="mx-auto flex max-w-7xl items-center gap-2 md:gap-4 px-4 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-[#1A1A2E]">
          <BookOpen className="h-6 w-6 text-[#0B5CFF]" aria-hidden />
          <span className="font-semibold tracking-tight text-xl md:text-2xl" style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {logo}
          </span>
        </Link>

        {/* Nav Links */}
        <nav aria-label="Main navigation" className="hidden md:flex items-center gap-2 xl:gap-5 ml-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-base font-medium px-2 py-1 rounded-md transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary'
              )}
              tabIndex={0}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Genre dropdown (visible on md+) */}
        <div className="relative hidden md:flex ml-4">
          <button
            type="button"
            aria-haspopup="listbox"
            aria-expanded={genreOpen}
            className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm transition hover:bg-muted"
            onClick={() => setGenreOpen((prev) => !prev)}
            aria-label="Select genre"
            tabIndex={0}
          >
            <span>{activeGenre?.label}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          {genreOpen && (
            <ul
              className="absolute left-0 mt-2 w-44 rounded-lg border border-border bg-card shadow-sm z-30"
              role="listbox"
            >
              {genres.map((genre) => (
                <li key={genre.value}>
                  <button
                    type="button"
                    onClick={() => {
                      onGenreChange(genre.value)
                      setGenreOpen(false)
                    }}
                    role="option"
                    aria-selected={selectedGenre === genre.value}
                    className={cn(
                      'w-full rounded-md px-3 py-2 text-left text-sm transition',
                      selectedGenre === genre.value
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'hover:bg-muted text-foreground'
                    )}
                  >
                    {genre.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Search */}
        <div className="relative flex-1 mx-4 max-w-xs md:max-w-lg">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
          <Input
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search books by title, author, or ISBN"
            aria-label="Search books"
            className="pl-9"
          />
        </div>

        {/* CTA Button (optional, e.g. Shop Now) */}
        {ctaLabel && ctaHref && (
          <Button className="hidden md:inline-flex ml-2" asChild>
            <Link href={ctaHref}>{ctaLabel}</Link>
          </Button>
        )}

        {/* Account/User menu */}
        <div className="relative ml-2">
          <Button
            variant="outline"
            className="gap-2"
            aria-haspopup="menu"
            aria-expanded={accountOpen}
            aria-label={userName ? `Account menu for ${userName}` : "Account"}
            onClick={() => setAccountOpen((p) => !p)}
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline">{userName || 'Account'}</span>
            <ChevronDown className="h-4 w-4" />
          </Button>
          {accountOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-56 rounded-lg border bg-white p-2 shadow-lg z-50"
              tabIndex={-1}
            >
              {userName ? (
                <>
                  <p className="px-2 py-1 text-sm font-medium text-[#1A1A2E]" aria-label={`Signed in as ${userName}`}>
                    Signed in as {userName}
                  </p>
                  {userRole === 'admin' && (
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
                      tabIndex={0}
                      role="menuitem"
                    >
                      <Shield className="h-4 w-4" />
                      Admin Dashboard
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setAccountOpen(false)
                      onSignOut()
                    }}
                    className="w-full rounded-md px-2 py-2 text-left text-sm hover:bg-muted"
                    role="menuitem"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setAccountOpen(false)
                    onGoogleLogin()
                  }}
                  className="flex w-full items-center gap-2 rounded-md px-2 py-2 text-sm hover:bg-muted"
                  role="menuitem"
                >
                  <LogIn className="h-4 w-4" />
                  Continue with Google
                </button>
              )}
            </div>
          )}
        </div>

        {/* Cart icon */}
        <Link href="/cart" className="relative rounded-lg border p-2 hover:bg-muted ml-2" aria-label="View cart">
          <ShoppingCart className="h-5 w-5 text-[#1A1A2E]" />
          <span className="absolute -right-1 -top-1 rounded-full bg-[#E63946] px-1.5 text-xs font-semibold text-white">
            {cartCount}
          </span>
        </Link>
      </div>
    </header>
  )
}
