"use client";

import React from "react";
import { Shield, Save, Clock3, ShoppingBag, Cloud, Star as StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface TrustBadge {
  title: string;
  description: string;
}

interface TrustBadgesProps {
  headline: string;
  subheadline?: string;
  badges: TrustBadge[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

const iconMap: Record<string, React.ElementType> = {
  "Google OAuth login": Cloud,
  "Cart persistence": Save,
  "Order history": Clock3,
  "Stock-aware catalog": ShoppingBag,
};

export default function TrustBadges({
  headline = "Why customers trust BookShop",
  subheadline,
  badges = [],
  primaryCta,
  secondaryCta,
}: Partial<TrustBadgesProps>) {
  const safeBadges =
    badges.length > 0
      ? badges
      : [
          {
            title: "Google OAuth login",
            description: "One-tap sign-in with secure account linking.",
          },
          {
            title: "Cart persistence",
            description: "Your cart follows you across sessions and devices.",
          },
          {
            title: "Order history",
            description: "See past orders, statuses, and totals in your account.",
          },
          {
            title: "Stock-aware catalog",
            description: "Add-to-cart respects inventory and prevents oversells.",
          },
        ];
  return (
    <section>
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">{headline}</h2>
        {subheadline && (
          <p className="mt-2 text-base md:text-lg text-muted-foreground">{subheadline}</p>
        )}
        <div className="mt-5 flex justify-center gap-4">
          {primaryCta && (
            <Link
              href={primaryCta.href}
              className="rounded-lg bg-primary px-4 py-2 text-primary-foreground border border-primary/60 font-semibold text-sm shadow-sm hover:bg-primary/90 transition"
            >
              {primaryCta.label}
            </Link>
          )}
          {secondaryCta && (
            <Link
              href={secondaryCta.href}
              className="rounded-lg border border-border px-4 py-2 text-foreground hover:bg-muted font-semibold text-sm shadow-sm transition"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {safeBadges.map((badge, i) => {
          const Icon = iconMap[badge.title] || Shield;
          return (
            <div
              key={badge.title}
              className={cn(
                "flex flex-col items-center border border-border rounded-lg bg-card shadow-sm p-6 gap-2 text-center"
              )}
            >
              <span className="mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="font-semibold text-lg">{badge.title}</h3>
              <p className="text-sm text-muted-foreground">{badge.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
