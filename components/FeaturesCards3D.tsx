"use client";
import React from "react";
import { CardContainer, CardBody, CardItem } from "@/components/ui/effects/3d-card-effect";
import { Shield, Truck, BadgeCheck, Sparkles, RefreshCw, Headset, ShieldCheck, User, Link, Package, Star, BookOpen, Search } from 'lucide-react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesCards3DProps {
  badge?: string;
  headline: string;
  subheadline?: string;
  features: Feature[];
}

const iconMap: Record<string, React.ElementType> = { ShieldCheck, User, Link, Package, Star, BookOpen, Search, 
  Shield,
  Truck,
  BadgeCheck,
  Sparkles,
  RefreshCw,
  Headset,
};

export default function FeaturesCards3D({
  badge = "Why shoppers choose us",
  headline = "Built for trust, speed, and value",
  subheadline = "Everything you need for a seamless e-commerce experience.",
  features = [],
}: Partial<FeaturesCards3DProps>) {
  return (
    <section className="bg-muted/50 py-20 md:py-28">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="animate-fade-in-up mx-auto max-w-2xl text-center">
          {badge && <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">{badge}</span>}
          <h2 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{headline}</h2>
          {subheadline && <p className="mt-4 text-lg text-muted-foreground">{subheadline}</p>}
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map(function (feature, index) {
            const Icon = iconMap[feature.icon] || Sparkles;
            return (
              <CardContainer key={index} className="inter-var">
                <CardBody className="card-hover group/card relative h-auto w-auto rounded-xl border border-border bg-card p-6">
                  <CardItem translateZ="50" className="mb-4 text-primary">
                    <Icon className="h-8 w-8" />
                  </CardItem>
                  <CardItem translateZ="60" className="text-xl font-bold text-foreground">
                    {feature.title}
                  </CardItem>
                  <CardItem as="p" translateZ="40" className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </CardItem>
                </CardBody>
              </CardContainer>
            );
          })}
        </div>
      </div>
    </section>
  );
}
