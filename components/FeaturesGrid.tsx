"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BadgeCheck, Globe, Shield, Sparkles, Star, Truck, Zap, BookOpen, FileText } from 'lucide-react';

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

const iconMap: Record<string, React.ElementType> = { BookOpen, FileText, 
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
  headline = "Built for a faster, safer shopping experience",
  subheadline = "From secure checkout to rapid delivery, every feature is designed to increase trust and conversions.",
  features = [],
}: Partial<FeaturesGridProps>) {
  const safeFeatures =
    features.length > 0
      ? features
      : [
          {
            icon: "Shield",
            title: "Secure Payments",
            description: "Protected checkout with trusted payment gateways and fraud monitoring.",
          },
          {
            icon: "Truck",
            title: "Fast Fulfillment",
            description: "Quick order processing and dependable shipping with real-time tracking.",
          },
          {
            icon: "Sparkles",
            title: "Curated Quality",
            description: "Handpicked products with quality checks so customers buy with confidence.",
          },
        ];

  return (
    <section className="py-20 md:py-28 bg-muted/50">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="animate-fade-in-up mx-auto max-w-2xl text-center">
          {badge && (
            <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
              {badge}
            </span>
          )}
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{headline}</h2>
          {subheadline && <p className="mt-4 text-lg text-muted-foreground">{subheadline}</p>}
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {safeFeatures.map(function (feature, index) {
            const IconComponent = iconMap[feature.icon] || Sparkles;
            return (
              <Card
                key={index}
                className="card-hover border border-border bg-card text-card-foreground shadow-sm transition-all duration-200"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {React.createElement(IconComponent, { className: "h-6 w-6" })}
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
