"use client";

interface PriceTagProps {
  price: number;
  compareAtPrice?: number;
  currency?: string;
}

export default function PriceTag({
  price,
  compareAtPrice,
  currency = "USD",
}: PriceTagProps) {
  const isDiscount = compareAtPrice && compareAtPrice > price;
  return (
    <div className="flex items-baseline gap-3">
      <span className="text-3xl font-bold text-primary">
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency,
        }).format(price)}
      </span>
      {isDiscount && (
        <>
          <span className="line-through text-lg text-muted-foreground">
            {new Intl.NumberFormat("en-US", {
              style: "currency",
              currency,
            }).format(compareAtPrice!)}
          </span>
          <span className="ml-2 rounded bg-accent px-2 py-0.5 text-xs text-accent-foreground font-semibold">
            -{Math.round(100 - (price / compareAtPrice!) * 100)}%
          </span>
        </>
      )}
    </div>
  );
}
