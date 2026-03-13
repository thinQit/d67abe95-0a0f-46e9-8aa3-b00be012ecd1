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
  stats = [],
  bgColor = "bg-primary text-primary-foreground",
}: Partial<StatsCounterProps>) {
  const safeStats =
    stats.length > 0
      ? stats
      : [
          { value: "120K+", label: "Orders Delivered" },
          { value: "45K+", label: "Happy Customers" },
          { value: "2,500+", label: "Products Available" },
          { value: "4.9/5", label: "Average Rating" },
        ];

  return (
    <section className={`py-16 ${bgColor}`}>
      <div className="container mx-auto max-w-7xl px-4">
        <div className="animate-fade-in-up grid gap-8 text-center grid-cols-2 md:grid-cols-4">
          {safeStats.map(function (stat, i) {
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
