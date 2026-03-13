'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { BookOpen, ChevronDown, Search, ShoppingCart, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

interface NavbarProps {
  logoText?: string
  genres?: string[]
  selectedGenre?: string
  cartCount?: number
  query?: string
  onGenreChange?: (genre: string) => void
  onSearchChange?: (value: string) => void
  onAccountClick?: () => void
  className?: string
}

export default function Navbar({
  logoText = 'BookShop',
  genres = ['All', 'Fiction', 'Fantasy', 'Mystery', 'Sci-Fi', 'Romance', 'Business'],
  selectedGenre = 'All',
  cartCount = 0,
  query = '',
  onGenreChange = () => {},
  onSearchChange = () => {},
  onAccountClick = () => {},
  className = '',
}: Partial<NavbarProps>) {
  const cartLabel = useMemo(() => (cartCount > 99 ? '99+' : String(cartCount)), [cartCount])

  return (
    <header className={cn('sticky top-0 z-40 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80', className)}>
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center gap-3 px-4 md:gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold text-[#1A1A2E]">
          <BookOpen className="h-5 w-5 text-[#0B5CFF]" />
          <span className="hidden sm:inline">{logoText}</span>
        </Link>

        <div className="hidden md:block">
          <div className="relative">
            <select
              value={selectedGenre}
              onChange={(e) => onGenreChange(e.target.value)}
              className="h-10 appearance-none rounded-lg border bg-white pl-3 pr-9 text-sm"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search books by title or author..."
            className="pl-9"
          />
        </div>

        <Button variant="ghost" size="icon" onClick={onAccountClick}>
          <User className="h-5 w-5" />
        </Button>

        <Link href="/cart">
          <Button variant="outline" className="relative gap-2">
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E63946] px-1 text-xs font-semibold text-white">
              {cartLabel}
            </span>
          </Button>
        </Link>
      </div>
    </header>
  )
}
