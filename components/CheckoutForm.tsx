"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CheckoutFormProps {
  headline?: string;
  subheadline?: string;
  fields?: string[];
}

export default function CheckoutForm({
  headline = "Shipping details",
  subheadline = "Collect shipping info and create an order from the cart.",
  fields = [
    "Full name",
    "Email",
    "Phone (optional)",
    "Address line 1",
    "Address line 2 (optional)",
    "City",
    "State/Region",
    "Postal code",
    "Country",
  ],
}: Partial<CheckoutFormProps>) {
  const [form, setForm] = useState<{ [k: string]: string }>({});
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: string, val: string) {
    setForm((f) => ({ ...f, [field]: val }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    // Simulated - would use API to create order
    setTimeout(() => setSubmitted(false), 1200);
  }

  return (
    <section className="max-w-xl mx-auto p-8 rounded-xl shadow bg-card border">
      <div className="text-center mb-5">
        <h2 className="text-2xl md:text-3xl font-bold">{headline}</h2>
        {subheadline && (
          <p className="mt-2 text-base text-muted-foreground">{subheadline}</p>
        )}
      </div>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {fields!.map((field) => {
          const key =
            field.toLowerCase().replace(/[^a-z0-9]/gi, "_").replace(/_+/g, "_");
          const required =
            !field.toLowerCase().includes("optional");
          return (
            <div key={field} className="flex flex-col gap-1">
              <label className="font-semibold text-sm">{field.replace(" (optional)", "")}</label>
              <input
                type={field.toLowerCase().includes("email") ? "email" : "text"}
                required={required}
                autoComplete={required ? "on" : "off"}
                className={cn(
                  "px-4 py-2 rounded-md border border-border text-base shadow-sm focus:ring-1 focus:ring-primary outline-none",
                  submitted && "bg-muted"
                )}
                value={form[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                disabled={submitted}
              />
            </div>
          );
        })}
        <Button
          type="submit"
          className="rounded-lg bg-primary px-8 py-2.5 text-primary-foreground font-semibold text-base shadow-sm hover:bg-primary/90 transition-all mt-2"
          disabled={submitted}
        >
          {submitted ? "Placing order…" : "Place order"}
        </Button>
      </form>
      {submitted && (
        <div className="mt-6 text-center text-primary font-semibold animate-pulse">
          Creating order…
        </div>
      )}
    </section>
  );
}
