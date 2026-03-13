"use client";

import { cn } from '@/lib/utils'

interface PriceProps {
  amount?: number
  currency?: string
  compareAt?: number
  className?: string
}

export default function Price({
  amount = 0,
  currency = 'USD',
  compareAt = 0,
  className = '',
}: Partial<PriceProps>) {
  const fmt = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  })

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <span className="text-lg font-bold text-[#1A1A2E]">{fmt.format(amount)}</span>
      {compareAt > amount ? (
        <span className="text-sm text-muted-foreground line-through">
          {fmt.format(compareAt)}
        </span>
      ) : null}
    </div>
  )
}
