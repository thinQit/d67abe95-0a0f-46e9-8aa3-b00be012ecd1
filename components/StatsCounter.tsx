"use client";

import React from "react";

interface Stat {
  value: string;
  label: string;
}

interface StatsCounterProps {
  stats: Stat[];
  bgColor?: string;
}

export default function StatsCounter({
  stats = [
    { value: "50K+", label: "Orders Delivered" },
    { value: "98%", label: "Customer Satisfaction" },
    { value: "24/7", label: "Support Coverage" },
    { value: "1,200+", label: "Top-Rated Products" },
  ],
  bgColor = "bg-primary text-primary-foreground",
}: Partial<StatsCounterProps>) {
  const cols = Math.min(stats.length || 2, 4);
  const colClass = cols === 1 ? "md:grid-cols-1" : cols === 2 ? "md:grid-cols-2" : cols === 3 ? "md:grid-cols-3" : "md:grid-cols-4";

  return (
    <section className={`py-16 md:py-20 ${bgColor}`}>
      <div className="container mx-auto max-w-7xl px-4 animate-fade-in-up">
        <div className={`grid gap-4 md:gap-6 text-center grid-cols-2 ${colClass}`}>
          {stats.map(function (stat, i) {
            return (
              <div key={i}>
                <p className="text-4xl font-bold md:text-5xl">{stat.value}</p>
                <p className="mt-2 text-sm uppercase tracking-wider opacity-80">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
