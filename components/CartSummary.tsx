"use client";
import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import PriceTag from "@/components/PriceTag";

export interface CartSummaryProps {
  cartItems: {
    id: string;
    title: string;
    price: number;
    quantity: number;
    compareAtPrice?: number;
  }[];
}

export default function CartSummary({ cartItems = [] }: CartSummaryProps) {
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const estimatedTax = +(subtotal * 0.07).toFixed(2);
  const estimatedShipping = subtotal === 0 ? 0 : subtotal >= 50 ? 0 : 4.99;
  const total = +(subtotal + estimatedTax + estimatedShipping).toFixed(2);

  return (
    <div className="rounded-xl border border-border bg-muted/80 p-6">
      <h3 className="text-lg font-semibold mb-4">Order summary</h3>
      <dl className="space-y-2 text-sm">
        <div className="flex justify-between">
          <dt>Subtotal</dt>
          <dd>
            <PriceTag price={subtotal} currency="USD" />
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>Estimated tax</dt>
          <dd>
            <PriceTag price={estimatedTax} currency="USD" />
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>Estimated shipping</dt>
          <dd>
            {estimatedShipping === 0 ? (
              <span className="text-success font-medium">Free</span>
            ) : (
              <PriceTag price={estimatedShipping} currency="USD" />
            )}
          </dd>
        </div>
        <div className="border-t border-dashed border-border my-3" />
        <div className="flex justify-between font-bold text-lg">
          <dt>Total</dt>
          <dd>
            <PriceTag price={total} currency="USD" />
          </dd>
        </div>
      </dl>
      <Button className="w-full mt-5" disabled={subtotal === 0}>
        Proceed to checkout
      </Button>
    </div>
  );
}
