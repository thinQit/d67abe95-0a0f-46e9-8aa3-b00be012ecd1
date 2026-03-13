"use client";

import { History, Lock, ShieldCheck, ShoppingCart } from 'lucide-react'

interface TrustBadgesProps {
  items?: { title: string; desc: string; icon: string }[]
}

export default function TrustBadges({
  items = [
    { title: 'Google OAuth', desc: 'Secure one-click login.', icon: 'Lock' },
    { title: 'Cart Persistence', desc: 'Your cart stays saved.', icon: 'ShoppingCart' },
    { title: 'Stock Aware', desc: 'No overselling on checkout.', icon: 'ShieldCheck' },
    { title: 'Order History', desc: 'Track previous purchases.', icon: 'History' },
  ],
}: Partial<TrustBadgesProps>) {
  const map = { Lock, ShoppingCart, ShieldCheck, History }
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {items.map((item) => {
        const Icon = map[item.icon as keyof typeof map] ?? ShieldCheck
        return (
          <div key={item.title} className="rounded-xl border bg-white p-4">
            <Icon className="mb-2 h-5 w-5 text-[#0B5CFF]" />
            <p className="font-medium">{item.title}</p>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        )
      })}
    </div>
  )
}
