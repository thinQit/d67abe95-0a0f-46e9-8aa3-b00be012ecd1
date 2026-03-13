"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
}

interface SiteHeaderProps {
  logo: string;
  navItems: NavItem[];
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

export default function SiteHeader({
  logo = "BookShop",
  navItems = [],
  ctaLabel = "Shop Now",
  ctaHref = "/catalog",
  className = "",
}: Partial<SiteHeaderProps>) {
  const pathname = usePathname();

  return (
    <header
      className={cn(
        "bg-card border-b border-border font-sans",
        "sticky top-0 z-50 w-full shadow-sm",
        "backdrop-blur-md backdrop-saturate-150 supports-[backdrop-filter]:bg-white/80",
        className
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        {/* Logo & Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight gradient-text md:text-2xl select-none">
            {logo}
          </span>
        </Link>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems?.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative px-2.5 py-1.5 rounded-lg transition-colors font-medium text-sm group",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-foreground hover:bg-muted"
              )}
            >
              {item.label}
              {pathname === item.href && (
                <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 h-1 w-2/3 rounded-full bg-primary/70" />
              )}
            </Link>
          ))}
        </div>
        {/* CTA Button & Hamburger */}
        <div className="flex items-center gap-4">
          <Link
            href={ctaHref || "/catalog"}
            className={cn(
              "hidden md:inline-block",
              "rounded-lg bg-primary px-5 py-2 text-primary-foreground font-semibold text-sm shadow-sm hover:bg-primary/90 transition-all"
            )}
          >
            {ctaLabel}
          </Link>
          {/* Hamburger menu (for mobile) */}
          {/* This can be replaced with a real drawer in future */}
        </div>
      </nav>
      {/* Mobile nav (simple fallback for now) */}
      <nav className="md:hidden border-t border-border bg-muted/50">
        <div className="flex px-2 py-2 justify-between items-center gap-1">
          {navItems?.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex-1 text-center rounded-md px-1.5 py-2 text-xs font-medium transition-colors",
                pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
