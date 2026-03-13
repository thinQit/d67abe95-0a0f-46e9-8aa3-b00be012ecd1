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
  headline = "Shop smarter with premium picks and fast delivery",
  subheadline = "Discover trusted products, seamless checkout, and limited-time deals designed for everyday value.",
  primaryCta = { label: "Shop Best Sellers", href: "#" },
  secondaryCta = { label: "Browse Categories", href: "#" },
}: Partial<HeroSpotlightProps>) {
  var words = headline.split(" ").map(function (word) {
    return { text: word };
  });
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex flex-col items-center justify-center overflow-hidden rounded-md bg-background antialiased">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#f59e0b" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.18),transparent_45%),radial-gradient(circle_at_bottom,rgba(239,68,68,0.12),transparent_50%)]" />
      <div className="relative z-10 mx-auto w-full max-w-4xl p-4 pt-20 md:pt-0 text-center animate-fade-in-up">
        <TypewriterEffect words={words} className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl text-foreground" cursorClassName="bg-primary" />
        <p className="mx-auto mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">{subheadline}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" className="rounded-lg px-6 py-3 font-medium transition-all duration-200 hover:scale-105" asChild>
            <a href={primaryCta.href}>{primaryCta.label}</a>
          </Button>
          {secondaryCta && (
            <Button variant="outline" size="lg" className="rounded-lg px-6 py-3 font-medium transition-all duration-200 hover:scale-105" asChild>
              <a href={secondaryCta.href}>{secondaryCta.label}</a>
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
