"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AuthCardProps {
  headline: string;
  subheadline?: string;
  benefits?: string[];
  children?: ReactNode;
  className?: string;
}

export default function AuthCard({
  headline = "Sign in",
  subheadline,
  benefits = [],
  children,
  className = "",
}: Partial<AuthCardProps>) {
  const demoBenefits =
    benefits && benefits.length
      ? benefits
      : [
          "Cart persistence across devices",
          "Order history and tracking",
          "Faster checkout",
        ];

  return (
    <div
      className={cn(
        "bg-card rounded-xl shadow border px-6 py-8 w-full flex flex-col items-center justify-center",
        className
      )}
    >
      <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
        {headline}
      </h2>
      {subheadline && (
        <p className="mb-4 text-base text-muted-foreground text-center">
          {subheadline}
        </p>
      )}
      {demoBenefits.length > 0 && (
        <ul className="mb-4 text-sm text-muted-foreground space-y-1 list-disc list-inside">
          {demoBenefits.map((benefit) => (
            <li key={benefit}>{benefit}</li>
          ))}
        </ul>
      )}
      {children && <div className="mt-2 w-full">{children}</div>}
    </div>
  );
}
