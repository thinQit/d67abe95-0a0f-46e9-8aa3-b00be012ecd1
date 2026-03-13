"use client";

import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  title: string;
  quote: string;
  rating?: number;
}

interface TestimonialsGridProps {
  headline: string;
  subheadline?: string;
  testimonials: Testimonial[];
}

export default function TestimonialsGrid({
  headline = "Customer reviews",
  subheadline = "Real reviews from readers.",
  testimonials = [],
}: Partial<TestimonialsGridProps>) {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">{headline}</h2>
          {subheadline && (
            <p className="mt-3 text-muted-foreground text-lg">{subheadline}</p>
          )}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((t, idx) => (
            <article
              key={idx}
              className="bg-card border border-border rounded-xl p-6 flex flex-col items-center text-center card-hover transition"
            >
              <div className="mb-2 flex items-center gap-1">
                {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-accent"
                    aria-label={i < (t.rating ?? 5) ? 'filled star' : 'empty star'}
                    fill="#8B5CF6"
                  />
                ))}
              </div>
              <blockquote className="text-lg font-medium mt-2">&quot;{t.quote}&quot;</blockquote>
              <footer className="mt-4 text-sm text-muted-foreground">
                <span className="font-semibold">{t.name}</span>
                {t.title && <> &mdash; {t.title}</>}
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
