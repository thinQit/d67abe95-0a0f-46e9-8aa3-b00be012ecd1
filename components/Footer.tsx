"use client";

import Link from "next/link";

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

interface FooterProps {
  brand: string;
  description: string;
  columns: FooterColumn[];
  copyright: string;
}

export default function Footer({
  brand,
  description,
  columns,
  copyright,
}: FooterProps) {
  return (
    <footer className="bg-card border-t py-16 px-4 text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" className="font-bold text-2xl md:text-3xl gradient-text">
              {brand}
            </Link>
            <p className="mt-4 max-w-xs text-muted-foreground">{description}</p>
          </div>
          <div className="flex flex-wrap gap-8 sm:gap-16">
            {columns.map((col) => (
              <nav key={col.title} aria-label={col.title} className="min-w-[120px]">
                <h3 className="font-semibold text-lg">{col.title}</h3>
                <ul className="mt-4 flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-muted-foreground hover:text-primary font-medium transition"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm text-muted-foreground">
          <div>
            {copyright}
          </div>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-primary">Privacy</Link>
            <Link href="/terms" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
