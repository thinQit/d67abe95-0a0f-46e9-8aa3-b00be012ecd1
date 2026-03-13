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
  headline = "Flash Deals on Everyday Favorites",
  subheadline = "Discover trending products, exclusive bundles, and limited-time offers with fast shipping and secure checkout.",
  primaryCta = { label: "Shop Best Sellers", href: "#" },
  secondaryCta = { label: "Browse Categories", href: "#" },
}: Partial<HeroSpotlightProps>) {
  var words = headline.split(" ").map(function (word) {
    return { text: word };
  });

  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex flex-col items-center justify-center overflow-hidden rounded-md bg-foreground antialiased">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="#f59e0b" />
      <div className="absolute inset-0 opacity-20 bg-[url('https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577712/site-images/hero-backgrounds/12981878.jpg')] bg-cover bg-center" />
      <div className="relative z-10 mx-auto w-full max-w-4xl p-4 pt-20 md:pt-0 text-center animate-fade-in-up">
        <TypewriterEffect
          words={words}
          className="text-4xl font-bold sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-primary-foreground to-primary-foreground/70"
        />
        <p className="mx-auto mt-6 max-w-2xl text-base text-primary-foreground/80 md:text-lg">{subheadline}</p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            size="lg"
            className="px-8 py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 hover:scale-105"
            asChild
          >
            <a href={primaryCta?.href || "#"}>{primaryCta?.label || ""}</a>
          </Button>
          {secondaryCta && (
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg border-border text-primary-foreground hover:bg-background/10 transition-all duration-200 hover:scale-105"
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
