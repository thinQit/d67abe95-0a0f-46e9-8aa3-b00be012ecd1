'use client'

import Link from 'next/link'
import { LayoutDashboard, Package, ShoppingBag, Users } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdminLayoutProps {
  role?: 'admin' | 'customer'
  currentPath?: string
  children?: React.ReactNode
}

export default function AdminLayout({
  role = 'admin',
  currentPath = '/admin',
  children = null,
}: Partial<AdminLayoutProps>) {
  if (role !== 'admin') {
    return <div className="p-6">Access denied.</div>
  }

  const links = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/inventory', label: 'Inventory', icon: Package },
    { href: '/admin/orders', label: 'Orders', icon: ShoppingBag },
    { href: '/admin/users', label: 'Users', icon: Users },
  ]

  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <aside className="w-64 border-r bg-white p-4">
        <h2 className="mb-4 font-semibold">Admin</h2>
        <nav className="space-y-1">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className={cn('flex items-center gap-2 rounded-lg px-3 py-2 text-sm', currentPath === l.href && 'bg-[#0B5CFF] text-white')}>
              <l.icon className="h-4 w-4" />
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1">
        <header className="border-b bg-white px-6 py-4 font-medium">BookShop Admin</header>
        <div className="p-6">{children}</div>
      </main>
    </div>
  )
}
