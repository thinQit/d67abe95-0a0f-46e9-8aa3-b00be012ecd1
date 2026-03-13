"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterLink {
  label: string;
  href: string;
}
interface FooterColumn {
  title: string;
  links: FooterLink[];
}
interface SiteFooterProps {
  brand: string;
  description: string;
  columns: FooterColumn[];
  copyright: string;
}

export default function SiteFooter({
  brand = "BookShop",
  description = "A modern bookstore demo with seeded content, Google OAuth, cart persistence, and admin inventory tools.",
  columns = [],
  copyright = "© 2026 BookShop. Demo storefront for seeded books.",
}: Partial<SiteFooterProps>) {
  return (
    <footer className="w-full mt-12 border-t border-border bg-card/80 text-card-foreground font-sans">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-16 grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-10 md:gap-20">
        {/* Branding */}
        <div className="flex flex-col gap-2">
          <span className="text-2xl font-extrabold tracking-tight gradient-text md:text-3xl select-none">
            {brand}
          </span>
          <p className="mt-2 text-muted-foreground text-sm">{description}</p>
        </div>
        {/* Link Columns */}
        {(columns ?? []).map((col, i) => (
          <div key={col.title + i} className="flex flex-col gap-2">
            <span className="font-semibold text-foreground">{col.title}</span>
            <ul className="mt-2 flex flex-col gap-1">
              {col.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm text-muted-foreground hover:text-primary transition"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mx-auto max-w-7xl px-4 md:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 border-t border-border pt-6 pb-8 text-xs text-muted-foreground">
        <span>{copyright}</span>
      </div>
    </footer>
  );
}
