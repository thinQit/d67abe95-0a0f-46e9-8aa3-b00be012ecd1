'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Price from '@/components/Price'

interface CartLineItemProps {
  id?: string
  title?: string
  price?: number
  quantity?: number
  stock?: number
  imageSrc?: string
  onQuantityChange?: (id: string, qty: number) => void
  onRemove?: (id: string) => void
}

export default function CartLineItem({
  id = 'book-1',
  title = 'Sample Book',
  price = 12.99,
  quantity = 1,
  stock = 5,
  imageSrc = 'https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577105/site-images/ecommerce/17485352.jpg',
  onQuantityChange = () => {},
  onRemove = () => {},
}: Partial<CartLineItemProps>) {
  return (
    <div className="flex gap-3 rounded-lg border p-2">
      <Image src={imageSrc} alt={title} width={64} height={88} className="rounded object-cover" unoptimized />
      <div className="flex-1">
        <p className="line-clamp-1 text-sm font-medium">{title}</p>
        <Price value={price} className="text-sm" />
        <div className="mt-2 flex items-center gap-2">
          <Button size="icon" variant="outline" onClick={() => onQuantityChange(id, Math.max(1, quantity - 1))}><Minus className="h-3 w-3" /></Button>
          <span className="text-sm">{quantity}</span>
          <Button size="icon" variant="outline" disabled={quantity >= stock} onClick={() => onQuantityChange(id, quantity + 1)}><Plus className="h-3 w-3" /></Button>
          <Button size="icon" variant="ghost" onClick={() => onRemove(id)}><Trash2 className="h-4 w-4 text-red-500" /></Button>
        </div>
      </div>
    </div>
  )
}
