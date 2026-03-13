"use client";

import Link from "next/link";
import { LayoutGrid, Package, ShoppingCart, Settings, Home } from "lucide-react";

const links = [
  { label: "Dashboard", href: "/admin", icon: Home },
  { label: "Inventory", href: "/admin/inventory", icon: Package },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Settings", href: "/admin/settings", icon: Settings }
];

export default function AdminSidebar() {
  return (
    <aside className="w-full max-w-xs flex flex-col gap-4 bg-card border border-border rounded-xl p-6 shadow-sm">
      <nav className="flex flex-col gap-1">
        <div className="mb-4 text-lg font-semibold text-foreground">Admin</div>
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-foreground hover:bg-muted font-medium transition"
            >
              <Icon className="h-5 w-5" />
              {link.label}
            </Link>
          );
        })}
        <Link
          href="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 mt-8 text-base text-accent hover:bg-muted"
        >
          <LayoutGrid className="h-5 w-5" />
          Back to storefront
        </Link>
      </nav>
    </aside>
  );
}
