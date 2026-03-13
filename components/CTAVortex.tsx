"use client";
import { Vortex } from "@/components/ui/backgrounds/vortex";
import { Button } from "@/components/ui/button";

interface CTAVortexProps {
  headline: string;
  description?: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export default function CTAVortex({
  headline = "Ready to save on your next order?",
  description = "Unlock exclusive offers, early access drops, and member-only discounts today.",
  ctaLabel = "Start Shopping",
  ctaHref = "#",
  secondaryCtaLabel = "View Deals",
  secondaryCtaHref = "#",
}: Partial<CTAVortexProps>) {
  return (
    <section className="w-full mx-auto rounded-md h-[30rem] overflow-hidden">
      <Vortex
        backgroundColor="black"
        baseHue={24}
        className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full animate-fade-in-up"
      >
        <h2 className="text-primary-foreground text-2xl md:text-6xl font-bold text-center">{headline}</h2>
        {description && <p className="text-primary-foreground/70 text-sm md:text-xl max-w-xl mt-6 text-center">{description}</p>}
        <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105"
            asChild
          >
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
          {secondaryCtaLabel && secondaryCtaHref && (
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg border-border text-primary-foreground hover:bg-background/10 transition-all duration-200 hover:scale-105"
              asChild
            >
              <a href={secondaryCtaHref}>{secondaryCtaLabel}</a>
            </Button>
          )}
        </div>
      </Vortex>
    </section>
  );
}
