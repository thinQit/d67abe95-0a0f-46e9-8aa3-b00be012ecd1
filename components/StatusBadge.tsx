"use client";

import { cn } from '@/lib/utils'

interface StatusBadgeProps {
  type?: 'in-stock' | 'low-stock' | 'out-of-stock' | 'pending' | 'paid' | 'shipped' | 'cancelled'
  className?: string
}

export default function StatusBadge({
  type = 'in-stock',
  className = '',
}: Partial<StatusBadgeProps>) {
  const map = {
    'in-stock': 'bg-green-100 text-green-700',
    'low-stock': 'bg-yellow-100 text-yellow-700',
    'out-of-stock': 'bg-red-100 text-red-700',
    pending: 'bg-amber-100 text-amber-700',
    paid: 'bg-blue-100 text-blue-700',
    shipped: 'bg-purple-100 text-purple-700',
    cancelled: 'bg-slate-100 text-slate-700',
  }
  return <span className={cn('rounded-full px-2 py-1 text-xs font-medium', map[type], className)}>{type.replace('-', ' ')}</span>
}
