"use client";
import { useState } from "react";
import { CheckCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NewsletterFormProps {
  headline: string;
  subheadline?: string;
  placeholder?: string;
  ctaLabel?: string;
  privacyNote?: string;
}

export default function NewsletterForm({
  headline = "Stay in the know",
  subheadline = "",
  placeholder = "you@domain.com",
  ctaLabel = "Subscribe",
  privacyNote = "",
}: Partial<NewsletterFormProps>) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // real implementation would call API
    setSubmitted(true);
    setEmail("");
    setTimeout(() => setSubmitted(false), 2000);
  }

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-2">{headline}</h2>
        {subheadline && (
          <p className="mb-6 text-muted-foreground text-lg">{subheadline}</p>
        )}
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <input
            type="email"
            required
            placeholder={placeholder}
            value={email}
            aria-label="Email address"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full sm:w-auto px-4 py-3 rounded-lg border border-border bg-muted text-base outline-none focus:ring-2 focus:ring-primary transition"
            disabled={submitted}
          />
          <Button type="submit" size="lg" className="px-7 py-3" disabled={submitted || !email}>
            {submitted ? (
              <span className="flex items-center gap-2"><CheckCircle size={20} /> Subscribed</span>
            ) : (
              <span className="flex items-center gap-2"><Send size={20} /> {ctaLabel}</span>
            )}
          </Button>
        </form>
        {privacyNote && (
          <p className="mt-3 text-xs text-muted-foreground">{privacyNote}</p>
        )}
      </div>
    </section>
  );
}
