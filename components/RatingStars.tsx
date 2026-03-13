"use client";

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface RatingStarsProps {
  rating?: number
  reviewCount?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function RatingStars({
  rating = 4.5,
  reviewCount = 0,
  size = 'sm',
  className = '',
}: Partial<RatingStarsProps>) {
  const fullStars = Math.floor(rating)
  const hasHalf = rating - fullStars >= 0.5

  const sizeClass =
    size === 'lg' ? 'h-5 w-5' : size === 'md' ? 'h-4 w-4' : 'h-3.5 w-3.5'

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex items-center gap-0.5">
        {[0, 1, 2, 3, 4].map((i) => {
          const filled = i < fullStars || (i === fullStars && hasHalf)
          return (
            <Star
              key={i}
              className={cn(
                sizeClass,
                filled ? 'fill-yellow-400 text-yellow-400' : 'text-muted-foreground'
              )}
            />
          )
        })}
      </div>
      <span className="text-xs text-muted-foreground">({reviewCount})</span>
    </div>
  )
}
