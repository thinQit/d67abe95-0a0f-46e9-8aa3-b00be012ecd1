"use client";

import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface StockBadgeProps {
  stock?: number
  className?: string
}

export default function StockBadge({ stock = 0, className = '' }: Partial<StockBadgeProps>) {
  if (stock <= 0) {
    return <Badge className={cn('bg-red-100 text-red-700 hover:bg-red-100', className)}>Out of stock</Badge>
  }

  if (stock <= 5) {
    return <Badge className={cn('bg-amber-100 text-amber-700 hover:bg-amber-100', className)}>Low stock</Badge>
  }

  return <Badge className={cn('bg-emerald-100 text-emerald-700 hover:bg-emerald-100', className)}>In stock</Badge>
}
