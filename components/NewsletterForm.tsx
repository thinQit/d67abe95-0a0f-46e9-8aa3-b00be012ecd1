"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  headline: string;
  subheadline?: string;
  placeholder?: string;
  finePrint?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function NewsletterForm({
  headline = "Get a monthly shelf—new arrivals and staff picks",
  subheadline = "Sign up and receive one curated email per month. No spam.",
  placeholder = "you@domain.com",
  finePrint = "By subscribing, you agree to receive BookShop emails. Unsubscribe anytime.",
  primaryCta = { label: "Subscribe", href: "/#newsletter" },
  secondaryCta = { label: "Browse new arrivals", href: "/catalog?sort=created_desc" },
}: Partial<NewsletterFormProps>) {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  // Note: Replace with true backend later
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="max-w-2xl mx-auto p-8 rounded-xl shadow bg-card border">
      <div className="text-center mb-5">
        <h2 className="text-2xl md:text-3xl font-bold">{headline}</h2>
        {subheadline && <p className="mt-2 text-base text-muted-foreground">{subheadline}</p>}
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col items-center gap-3 md:flex-row md:gap-2">
          <input
            type="email"
            placeholder={placeholder}
            required
            className={cn(
              "w-full md:w-auto px-4 py-2 rounded-md border border-border text-base shadow-sm focus:ring-1 focus:ring-primary outline-none"
            )}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={submitted}
            aria-label="Email"
          />
          <button
            disabled={submitted || !email}
            type="submit"
            className={cn(
              "rounded-lg bg-primary px-6 py-2 text-primary-foreground font-semibold text-base shadow-sm hover:bg-primary/90 transition-all",
              submitted ? "opacity-60 cursor-not-allowed" : ""
            )}
          >
            {submitted ? "Subscribed" : primaryCta?.label ?? "Subscribe"}
          </button>
        </div>
        <div className="flex flex-col gap-2 items-center mt-2">
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className="text-sm text-primary hover:underline mt-2"
            >
              {secondaryCta.label}
            </a>
          )}
          {finePrint && <span className="text-xs text-muted-foreground">{finePrint}</span>}
        </div>
      </form>
    </section>
  );
}
