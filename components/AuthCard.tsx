"use client";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import Link from "next/link";

interface AuthCardProps {
  headline: string;
  subheadline?: string;
  primaryCta: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}

export default function AuthCard({
  headline = "Sign in",
  subheadline = "Continue with Google for the best experience.",
  primaryCta = { label: "Continue with Google", href: "/api/auth/signin?provider=google" },
  secondaryCta = { label: "Back to catalog", href: "/catalog" },
}: Partial<AuthCardProps>) {
  return (
    <div className="max-w-md mx-auto bg-white border border-border rounded-xl px-6 py-10 shadow-md text-center">
      <h2 className="text-3xl font-bold mb-3">{headline}</h2>
      {subheadline && <p className="mb-6 text-muted-foreground">{subheadline}</p>}
      <Button
        asChild
        className="w-full gap-2 text-lg"
        size="lg"
      >
        <a href={primaryCta?.href ?? "/api/auth/signin?provider=google"}>
          <LogIn className="h-5 w-5 mr-1" />
          {primaryCta?.label ?? "Continue with Google"}
        </a>
      </Button>
      {secondaryCta && (
        <Link
          href={secondaryCta.href}
          className="block mt-6 text-primary font-medium hover:underline text-base"
        >
          {secondaryCta.label}
        </Link>
      )}
      <div className="mt-8 text-left text-muted-foreground text-sm">
        <ul className="list-disc pl-5">
          <li>Cart persistence across devices</li>
          <li>Order history &amp; receipts</li>
          <li>Fast checkout-ready flow</li>
        </ul>
      </div>
    </div>
  );
}
