"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import QuantityStepper from "@/components/QuantityStepper";
import StockBadge from "@/components/StockBadge";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  bookId?: string;
  stock?: number;
  label?: string;
  className?: string;
  disabled?: boolean;
}

export default function AddToCartButton({
  bookId = "",
  stock = 10,
  label = "Add to cart",
  className = "",
  disabled = false,
}: Partial<AddToCartButtonProps>) {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);
  const isOutOfStock = stock <= 0;

  async function handleAdd() {
    if (loading || isOutOfStock || !bookId) return;
    setLoading(true);
    // Simulate API request
    await new Promise((res) => setTimeout(res, 600));
    setAdded(true);
    setLoading(false);
    setTimeout(() => setAdded(false), 1250);
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div className="flex items-center gap-2">
        <QuantityStepper
          value={quantity}
          min={1}
          max={Math.max(1, stock)}
          onChange={setQuantity}
          className="mr-2"
        />
        <StockBadge stock={stock} />
      </div>
      <Button
        type="button"
        className={cn(
          "mt-2 w-full md:w-auto px-8 py-2.5 rounded-lg font-semibold transition-all duration-200",
          isOutOfStock || disabled ? "bg-muted text-muted-foreground cursor-not-allowed" : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105"
        )}
        disabled={isOutOfStock || disabled || loading}
        onClick={handleAdd}
      >
        {added
          ? "Added!"
          : isOutOfStock
          ? "Out of stock"
          : loading
          ? "Adding…"
          : label}
      </Button>
    </div>
  );
}
