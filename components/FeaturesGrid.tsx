"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Globe, Shield, Sparkles, Star, Truck, Zap } from "lucide-react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  badge?: string;
  headline: string;
  subheadline?: string;
  features: Feature[];
}

const iconMap: Record<string, React.ElementType> = {
  Sparkles,
  Globe,
  Shield,
  Star,
  Zap,
  Truck,
  BadgeCheck,
};

export default function FeaturesGrid({
  badge = "Why shoppers choose us",
  headline = "Built for fast, confident online shopping",
  subheadline = "From secure checkout to lightning delivery, every feature is designed to help customers buy with trust.",
  features = [
    { icon: "Shield", title: "Secure Checkout", description: "PCI-safe payments and encrypted transactions on every order." },
    { icon: "Truck", title: "Fast Fulfillment", description: "Quick shipping windows with real-time tracking from cart to door." },
    { icon: "Sparkles", title: "Curated Quality", description: "Handpicked products with strict quality standards and reviews." },
  ],
}: Partial<FeaturesGridProps>) {
  return (
    <section className="py-16 md:py-20 bg-muted/50">
      <div className="container mx-auto max-w-7xl px-4 animate-fade-in-up">
        <div className="mx-auto max-w-2xl text-center">
          {badge && <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">{badge}</span>}
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{headline}</h2>
          {subheadline && <p className="mt-4 text-lg text-muted-foreground">{subheadline}</p>}
        </div>
        <div className="mt-16 grid gap-4 md:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map(function (feature, index) {
            const Icon = iconMap[feature.icon] || Sparkles;
            return (
              <Card key={index} className="rounded-xl border bg-card shadow-sm hover:shadow-md transition-shadow card-hover">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {React.createElement(Icon, { className: "h-6 w-6" })}
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
