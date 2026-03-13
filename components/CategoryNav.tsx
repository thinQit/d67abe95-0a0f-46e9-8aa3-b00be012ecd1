"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface Category {
  name: string;
  href: string;
  countLabel?: string;
}

interface CategoryNavProps {
  headline: string;
  subheadline?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  categories: Category[];
}

export default function CategoryNav({
  headline = "Shop by genre",
  subheadline = "Browse top genres and find your shelf.",
  primaryCta,
  secondaryCta,
  categories = [],
}: Partial<CategoryNavProps>) {
  const safeCategories =
    categories.length > 0
      ? categories
      : [
          {
            name: "Fantasy",
            href: "/catalog?genre=Fantasy",
            countLabel: "8 titles",
          },
          {
            name: "Mystery & Thriller",
            href: "/catalog?genre=Mystery",
            countLabel: "7 titles",
          },
          {
            name: "Romance",
            href: "/catalog?genre=Romance",
            countLabel: "6 titles",
          },
          {
            name: "Science Fiction",
            href: "/catalog?genre=Sci-Fi",
            countLabel: "6 titles",
          },
          {
            name: "Nonfiction",
            href: "/catalog?genre=Nonfiction",
            countLabel: "7 titles",
          },
          {
            name: "Technology",
            href: "/catalog?genre=Technology",
            countLabel: "6 titles",
          },
        ];
  return (
    <section>
      <div className="text-center mb-10">
        {headline && (
          <h2 className="text-3xl md:text-4xl font-bold">{headline}</h2>
        )}
        {subheadline && (
          <p className="mt-2 text-base md:text-lg text-muted-foreground">
            {subheadline}
          </p>
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
              className="rounded-lg border border-border px-4 py-2 text-foreground  hover:bg-muted font-semibold text-sm shadow-sm transition"
            >
              {secondaryCta.label}
            </Link>
          )}
        </div>
      </div>
      <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-muted-foreground/30 scrollbar-track-muted rounded-xl border bg-card shadow-inner p-4">
        <div className="flex gap-3 md:gap-5 items-stretch min-w-[520px] md:min-w-[704px]">
          {safeCategories.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={cn(
                "flex flex-col items-center gap-1 px-4 py-3 rounded-lg bg-muted hover:bg-primary/10 transition shadow-sm border border-border min-w-[120px] text-center",
                "group"
              )}
            >
              <span className="font-medium text-sm md:text-base text-primary">
                {cat.name}
              </span>
              {cat.countLabel && (
                <span className="text-xs text-muted-foreground">
                  {cat.countLabel}
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
