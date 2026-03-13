"use client";

import { ShieldCheck, ShoppingBag, Database, Truck } from "lucide-react";

interface Badge {
  title: string;
  description: string;
}
interface TrustBadgesProps {
  headline: string;
  subheadline?: string;
  badges: Badge[];
}

const icons = [ShieldCheck, ShoppingBag, Database, Truck];

export default function TrustBadges({
  headline = "Trusted by thousands",
  subheadline,
  badges = [],
}: Partial<TrustBadgesProps>) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">{headline}</h2>
          {subheadline && (
            <p className="mt-3 text-muted-foreground text-lg">{subheadline}</p>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, idx) => {
            const Icon = icons[idx % icons.length];
            return (
              <div
                key={badge.title}
                className="rounded-xl border bg-white shadow-sm p-6 flex flex-col items-center text-center card-hover transition"
              >
                <span className="mb-2">
                  <Icon className="w-7 h-7 text-primary" aria-hidden />
                </span>
                <h3 className="font-semibold text-lg">{badge.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{badge.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
