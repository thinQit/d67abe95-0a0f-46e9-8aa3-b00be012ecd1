"use client";
import { Spotlight } from "@/components/ui/backgrounds/spotlight";
import { TypewriterEffect } from "@/components/ui/text/typewriter-effect";
import { Button } from "@/components/ui/button";

interface HeroSpotlightProps {
  headline: string;
  subheadline: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function HeroSpotlight({
  headline = "Flash Deals on Everyday Essentials",
  subheadline = "Discover trusted products, fast shipping, and unbeatable value—all in one clean shopping experience.",
  primaryCta = { label: "Shop Best Sellers", href: "#" },
  secondaryCta = { label: "Browse Categories", href: "#" },
}: Partial<HeroSpotlightProps>) {
  var words = headline.split(" ").map(function (word) {
    return { text: word };
  });
  return (
    <section className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden rounded-md bg-background antialiased md:min-h-[700px]">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#E63946" />
      <div className="absolute inset-0 bg-muted/30" />
      <div className="animate-fade-in-up relative z-10 mx-auto w-full max-w-4xl p-4 pt-20 text-center md:pt-0">
        <TypewriterEffect
          words={words}
          className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl text-foreground"
          cursorClassName="bg-primary"
        />
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">{subheadline}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="bg-primary px-8 py-6 text-lg text-primary-foreground transition-all duration-200 hover:scale-105" asChild>
            <a href={primaryCta?.href}>{primaryCta?.label}</a>
          </Button>
          {secondaryCta && (
            <Button
              variant="outline"
              size="lg"
              className="border-border px-8 py-6 text-lg text-foreground transition-all duration-200 hover:scale-105"
              asChild
            >
              <a href={secondaryCta.href}>{secondaryCta.label}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
