"use client";

import Link from "next/link";

interface Category {
  name: string;
  href: string;
  count: number;
}

interface Cta {
  label: string;
  href: string;
}

interface CategoryNavProps {
  headline: string;
  subheadline?: string;
  categories: Category[];
  primaryCta?: Cta;
  secondaryCta?: Cta;
}

export default function CategoryNav({
  headline = "Shop by genre",
  subheadline,
  categories = [],
  primaryCta,
  secondaryCta,
}: Partial<CategoryNavProps>) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto flex flex-col gap-6 px-4">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-bold">{headline}</h2>
          {subheadline && (
            <p className="mt-2 text-muted-foreground text-lg">{subheadline}</p>
          )}
        </div>
        <div className="flex overflow-x-auto gap-4 md:gap-6 px-1 pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className="card-hover flex flex-col items-center bg-white border border-border rounded-xl px-5 py-3 min-w-[128px] hover:bg-primary/10 transition group"
              tabIndex={0}
              aria-label={`Shop ${cat.name} (${cat.count} books)`}
            >
              <span className="text-base md:text-lg font-semibold text-foreground">{cat.name}</span>
              <span className="mt-1 text-xs rounded-full bg-muted px-2 py-0.5 text-muted-foreground">
                {cat.count} titles
              </span>
            </Link>
          ))}
        </div>
        {(primaryCta || secondaryCta) && (
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="bg-primary text-primary-foreground font-medium px-6 py-3 rounded-lg text-base shadow-sm hover:bg-primary/90 transition"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="border border-border text-foreground font-medium px-6 py-3 rounded-lg text-base hover:bg-muted transition"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
