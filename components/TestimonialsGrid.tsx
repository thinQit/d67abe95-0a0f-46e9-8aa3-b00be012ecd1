"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar?: string;
}

interface TestimonialsGridProps {
  headline: string;
  subheadline?: string;
  testimonials: Testimonial[];
}

export default function TestimonialsGrid({
  headline = "What readers are saying",
  subheadline,
  testimonials = [],
}: Partial<TestimonialsGridProps>) {
  const safeTestimonials =
    testimonials.length > 0
      ? testimonials
      : [
          {
            name: "Avery Chen",
            role: "Fantasy reader",
            quote:
              "The genre filters are spot-on. I found three new authors in under five minutes.",
            rating: 5,
            avatar:
              "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577321/site-images/team-people/1181622.jpg",
          },
          {
            name: "Jordan Reyes",
            role: "Software engineer",
            quote:
              "Search is fast, product pages are clean, and the cart stayed saved after I signed in with Google.",
            rating: 5,
            avatar:
              "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577358/site-images/team-people/1181401.jpg",
          },
          {
            name: "Samira Khan",
            role: "Nonfiction fan",
            quote:
              "Love the stock labels—no surprises at checkout. The featured shelf is genuinely curated.",
            rating: 4,
            avatar:
              "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577335/site-images/team-people/1181734.jpg",
          },
          {
            name: "Morgan Blake",
            role: "Mystery & thriller reader",
            quote:
              "The product detail page makes it easy to compare editions and see what’s in stock.",
            rating: 5,
            avatar:
              "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577327/site-images/team-people/12899112.jpg",
          },
        ];

  return (
    <section>
      <div className="mb-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">{headline}</h2>
        {subheadline && (
          <p className="mt-2 text-lg text-muted-foreground">{subheadline}</p>
        )}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {safeTestimonials.map((item, i) => (
          <div
            key={i}
            className={cn(
              "rounded-xl border bg-card p-5 flex flex-col shadow-sm group hover:shadow-md transition-shadow"
            )}
          >
            <div className="flex items-center gap-3 mb-2">
              <Image
                src={item.avatar || "https://ui.shadcn.com/avatars/01.png"}
                width={48}
                height={48}
                className="rounded-full border"
                alt={item.name}
                unoptimized
              />
              <div>
                <p className="font-semibold text-foreground">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.role}</p>
              </div>
            </div>
            <p className="mt-2 mb-3 text-sm text-muted-foreground leading-relaxed">
              “{item.quote}”
            </p>
            <div className="flex items-center gap-1 mt-auto">
              {[...Array(item.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
              {[...Array(5 - item.rating)].map((_, i) => (
                <Star key={item.rating + i} className="w-4 h-4 text-muted-foreground" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
