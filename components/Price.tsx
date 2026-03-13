"use client";

import { cn } from '@/lib/utils'

interface PriceProps {
  value?: number
  currency?: string
  className?: string
}

export default function Price({
  value = 0,
  currency = 'USD',
  className = '',
}: Partial<PriceProps>) {
  return (
    <span className={cn('font-bold text-[#1A1A2E]', className)}>
      {new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(value)}
    </span>
  )
}
