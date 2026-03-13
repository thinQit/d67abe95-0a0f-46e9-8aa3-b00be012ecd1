"use client";

import Link from 'next/link'

interface FooterProps {
  brand?: string
}

export default function Footer({ brand = 'BookShop' }: Partial<FooterProps>) {
  return (
    <footer className="mt-16 border-t bg-[#F8F9FA]">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 md:grid-cols-4">
        <div><p className="font-semibold">{brand}</p><p className="text-sm text-muted-foreground">Your trusted online bookstore.</p></div>
        <div><p className="mb-2 font-medium">Shop</p><div className="space-y-1 text-sm"><Link href="/catalog">All Books</Link></div></div>
        <div><p className="mb-2 font-medium">Account</p><div className="space-y-1 text-sm"><Link href="/login">Login</Link></div></div>
        <div><p className="mb-2 font-medium">Help</p><div className="space-y-1 text-sm"><Link href="/support">Support</Link></div></div>
      </div>
      <div className="border-t py-4 text-center text-xs text-muted-foreground">© 2026 {brand}. All rights reserved.</div>
    </footer>
  )
}
