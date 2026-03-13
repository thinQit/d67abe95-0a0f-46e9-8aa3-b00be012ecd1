'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MobileNavDrawerProps {
  isOpen?: boolean
  role?: 'customer' | 'admin'
  genres?: string[]
  onClose?: () => void
  className?: string
}

export default function MobileNavDrawer({
  isOpen = false,
  role = 'customer',
  genres = ['Fiction', 'Fantasy', 'Mystery', 'Romance'],
  onClose = () => {},
  className = '',
}: Partial<MobileNavDrawerProps>) {
  return (
    <div className={cn('fixed inset-0 z-50 md:hidden', !isOpen && 'pointer-events-none', className)}>
      <div className={cn('absolute inset-0 bg-black/40 transition-opacity', isOpen ? 'opacity-100' : 'opacity-0')} onClick={onClose} />
      <aside className={cn('absolute right-0 top-0 h-full w-80 bg-white p-4 transition-transform', isOpen ? 'translate-x-0' : 'translate-x-full')}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menu</h2>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-6">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">Genres</p>
            <div className="grid grid-cols-2 gap-2">
              {genres.map((genre) => (
                <Link key={genre} href={'/catalog?genre=' + encodeURIComponent(genre)} className="rounded-lg border px-3 py-2 text-sm">
                  {genre}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Link href="/featured" className="block rounded-lg px-3 py-2 hover:bg-muted">Featured Books</Link>
            <Link href="/account" className="block rounded-lg px-3 py-2 hover:bg-muted">Account</Link>
            {role === 'admin' && (
              <Link href="/admin" className="block rounded-lg px-3 py-2 font-medium text-[#0B5CFF] hover:bg-muted">
                Admin Dashboard
              </Link>
            )}
          </div>
        </nav>
      </aside>
    </div>
  )
}
