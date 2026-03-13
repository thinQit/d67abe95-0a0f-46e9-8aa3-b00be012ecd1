"use client";

import Link from 'next/link'
import { Inbox, Search, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface EmptyStateProps {
  icon?: string
  title?: string
  message?: string
  ctaLabel?: string
  ctaHref?: string
}

export default function EmptyState({
  icon = 'Inbox',
  title = 'Nothing here yet',
  message = 'Try adjusting your filters or continue browsing.',
  ctaLabel = 'Browse catalog',
  ctaHref = '/catalog',
}: Partial<EmptyStateProps>) {
  const map = { Inbox, Search, ShoppingBag }
  const Icon = map[icon as keyof typeof map] ?? Inbox

  return (
    <div className="rounded-xl border bg-white p-10 text-center">
      <Icon className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">{message}</p>
      <Link href={ctaHref}>
        <Button className="mt-4"> {ctaLabel} </Button>
      </Link>
    </div>
  )
}
