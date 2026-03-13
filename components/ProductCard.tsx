'use client'

import Image from 'next/image'
import { Star } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Price from '@/components/Price'
import StatusBadge from '@/components/StatusBadge'

interface ProductCardProps {
  id?: string
  title?: string
  author?: string
  rating?: number
  price?: number
  stock?: number
  imageSrc?: string
  onAddToCart?: (id: string) => void
  className?: string
}

export default function ProductCard({
  id = 'book-1',
  title = 'The Midnight Library',
  author = 'Matt Haig',
  rating = 4.7,
  price = 16.99,
  stock = 12,
  imageSrc = 'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577126/site-images/ecommerce/16675636.jpg',
  onAddToCart = () => {},
  className = '',
}: Partial<ProductCardProps>) {
  return (
    <Card className={cn('overflow-hidden rounded-xl border bg-white', className)}>
      <div className="relative aspect-[3/4]">
        <Image src={imageSrc} alt={title} fill width={600} height={800} className="object-cover" unoptimized />
      </div>
      <div className="space-y-2 p-4">
        <h3 className="line-clamp-1 font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">{author}</p>
        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          {rating.toFixed(1)}
        </div>
        <div className="flex items-center justify-between">
          <Price value={price} />
          <StatusBadge type={stock > 0 ? 'in-stock' : 'out-of-stock'} />
        </div>
        <Button className="w-full bg-[#E63946] hover:bg-[#d9333f]" disabled={stock <= 0} onClick={() => onAddToCart(id)}>
          Quick Add
        </Button>
      </div>
    </Card>
  )
}
