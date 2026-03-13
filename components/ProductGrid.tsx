'use client'

import ProductCard from '@/components/ProductCard'
import EmptyState from '@/components/EmptyState'

interface Product {
  id: string
  title: string
  author: string
  rating: number
  price: number
  stock: number
  imageSrc: string
}

interface ProductGridProps {
  products?: Product[]
  loading?: boolean
  page?: number
  totalPages?: number
  onPageChange?: (page: number) => void
  onAddToCart?: (id: string) => void
}

export default function ProductGrid({
  products = [],
  loading = false,
  page = 1,
  totalPages = 1,
  onPageChange = () => {},
  onAddToCart = () => {},
}: Partial<ProductGridProps>) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="h-80 animate-pulse rounded-xl bg-muted" />
        ))}
      </div>
    )
  }

  if (!products.length) {
    return <EmptyState title="No books found" message="Try a different genre or search term." />
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} onAddToCart={onAddToCart} />
        ))}
      </div>
      <div className="flex items-center justify-center gap-2">
        <button className="rounded border px-3 py-1 text-sm" disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
          Prev
        </button>
        <span className="text-sm">Page {page} of {totalPages}</span>
        <button className="rounded border px-3 py-1 text-sm" disabled={page >= totalPages} onClick={() => onPageChange(page + 1)}>
          Next
        </button>
      </div>
    </div>
  )
}
