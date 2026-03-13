"use client";
import Image from "next/image";
import { X, Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import PriceTag from "@/components/PriceTag";

export interface CartLineItemProps {
  id: string;
  title: string;
  slug: string;
  author: string;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  stock: number;
  coverUrl?: string;
  onRemove?: (id: string) => void;
  onUpdateQty?: (id: string, quantity: number) => void;
}

export default function CartLineItem({
  id,
  title,
  slug,
  author,
  price,
  compareAtPrice,
  quantity: qty = 1,
  stock = 10,
  coverUrl,
  onRemove,
  onUpdateQty,
}: CartLineItemProps) {
  const [quantity, setQuantity] = useState(qty);

  const handleUpdateQty = (newQty: number) => {
    if (newQty < 1 || newQty > stock) return;
    setQuantity(newQty);
    onUpdateQty?.(id, newQty);
  };

  return (
    <div className="flex gap-4 items-center p-3 rounded-lg bg-muted border border-border">
      <Image
        src={coverUrl || "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_1200,h_800,g_auto/v1771577154/site-images/ecommerce/10330119.jpg"}
        alt={`Cover for ${title}`}
        width={64}
        height={80}
        className="rounded-md object-cover flex-shrink-0 aspect-[4/5]"
      />
      <div className="flex-1">
        <a href={`/book/${slug}`} className="font-semibold text-base hover:text-primary">
          {title}
        </a>
        <div className="text-sm text-muted-foreground">by {author}</div>
        <PriceTag price={price} compareAtPrice={compareAtPrice} />
        <div className="flex items-center gap-2 mt-2">
          <Button
            size="sm"
            variant="outline"
            aria-label={`Decrease quantity for ${title}`}
            onClick={() => handleUpdateQty(quantity - 1)}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-2">{quantity}</span>
          <Button
            size="sm"
            variant="outline"
            aria-label={`Increase quantity for ${title}`}
            onClick={() => handleUpdateQty(quantity + 1)}
            disabled={quantity >= stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
          <span className="ml-2 text-xs text-muted-foreground">
            {stock > 5
              ? "In stock"
              : stock > 0
              ? `Only ${stock} left`
              : "Out of stock"}
          </span>
        </div>
      </div>
      <Button
        size="sm"
        variant="ghost"
        aria-label={`Remove ${title} from cart`}
        onClick={() => onRemove?.(id)}
        className="text-destructive"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>
  );
}
