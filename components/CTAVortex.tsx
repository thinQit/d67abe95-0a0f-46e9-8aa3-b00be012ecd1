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
  headline = "Ready to upgrade your cart?",
  description = "Join thousands of happy customers and get exclusive member pricing on best-selling products.",
  ctaLabel = "Start Shopping",
  ctaHref = "#",
  secondaryCtaLabel = "View Deals",
  secondaryCtaHref = "#",
}: Partial<CTAVortexProps>) {
  return (
    <section className="w-full mx-auto rounded-md h-[30rem] overflow-hidden">
      <Vortex backgroundColor="black" baseHue={25} className="flex items-center flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
        <div className="animate-fade-in-up">
          <h2 className="text-primary-foreground text-2xl md:text-6xl font-bold text-center">{headline}</h2>
          {description && <p className="text-primary-foreground/70 text-sm md:text-xl max-w-xl mt-6 text-center mx-auto">{description}</p>}
          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 justify-center">
            <Button size="lg" className="rounded-lg px-6 py-3 font-medium transition-all duration-200 hover:scale-105 bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <a href={ctaHref}>{ctaLabel}</a>
            </Button>
            {secondaryCtaLabel && secondaryCtaHref && (
              <Button
                variant="outline"
                size="lg"
                className="rounded-lg px-6 py-3 font-medium transition-all duration-200 hover:scale-105 border-border text-primary-foreground hover:bg-muted/50"
                asChild
              >
                <a href={secondaryCtaHref}>{secondaryCtaLabel}</a>
              </Button>
            )}
          </div>
        </div>
      </Vortex>
    </section>
  );
}
