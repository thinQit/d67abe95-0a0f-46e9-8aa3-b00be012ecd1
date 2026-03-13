'use client'

import { Input } from '@/components/ui/input'

interface FilterSidebarProps {
  genres?: string[]
  selectedGenre?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  featuredOnly?: boolean
  sortBy?: string
  onChange?: (filters: Record<string, string | number | boolean>) => void
}

export default function FilterSidebar({
  genres = ['All', 'Fiction', 'Fantasy', 'Business', 'Mystery'],
  selectedGenre = 'All',
  minPrice = 0,
  maxPrice = 100,
  inStock = false,
  featuredOnly = false,
  sortBy = 'popular',
  onChange = () => {},
}: Partial<FilterSidebarProps>) {
  return (
    <aside className="space-y-4 rounded-xl border bg-white p-4">
      <h3 className="font-semibold">Filters</h3>
      <select value={selectedGenre} onChange={(e) => onChange({ genre: e.target.value })} className="w-full rounded border p-2 text-sm">
        {genres.map((genre) => <option key={genre}>{genre}</option>)}
      </select>
      <div className="grid grid-cols-2 gap-2">
        <Input type="number" value={minPrice} onChange={(e) => onChange({ minPrice: Number(e.target.value) })} />
        <Input type="number" value={maxPrice} onChange={(e) => onChange({ maxPrice: Number(e.target.value) })} />
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={inStock} onChange={(e) => onChange({ inStock: e.target.checked })} />
        In stock only
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={featuredOnly} onChange={(e) => onChange({ featuredOnly: e.target.checked })} />
        Featured only
      </label>
      <select value={sortBy} onChange={(e) => onChange({ sortBy: e.target.value })} className="w-full rounded border p-2 text-sm">
        <option value="popular">Most popular</option>
        <option value="price-asc">Price low to high</option>
        <option value="price-desc">Price high to low</option>
        <option value="rating">Top rated</option>
      </select>
    </aside>
  )
}
