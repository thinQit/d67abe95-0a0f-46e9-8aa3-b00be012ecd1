"use client";

import Image from "next/image";
import Link from "next/link";
import Price from "@/components/Price";
import QuantityStepper from "@/components/QuantityStepper";
import StockBadge from "@/components/StockBadge";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Stubbed demo cart data
interface CartLineItem {
  bookId: string;
  title: string;
  author: string;
  imageUrl: string;
  price: number;
  stock: number;
  quantity: number;
  href: string;
}

const demoItems: CartLineItem[] = [
  {
    bookId: "a1",
    title: "The Midnight Archive",
    author: "Elena Ward",
    imageUrl:
      "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_400,h_500,g_auto/v1771577111/site-images/ecommerce/3767397.jpg",
    price: 19.99,
    stock: 9,
    quantity: 2,
    href: "/book/the-midnight-archive",
  },
  {
    bookId: "a2",
    title: "Practical TypeScript",
    author: "Noah Kim",
    imageUrl:
      "https://res.cloudinary.com/dwc294mzm/image/upload/c_fill,w_400,h_500,g_auto/v1771577109/site-images/ecommerce/10330112.jpg",
    price: 34,
    stock: 4,
    quantity: 1,
    href: "/book/practical-typescript",
  },
];

interface CartTableProps {}

export default function CartTable({}: CartTableProps) {
  const [items, setItems] = useState<CartLineItem[]>(demoItems);

  // Totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = items.length ? 5.5 : 0;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = subtotal + shipping + tax;

  function updateQty(idx: number, value: number) {
    setItems((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, quantity: value } : item
      )
    );
  }

  function removeItem(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  if (!items.length) {
    return (
      <div className="text-center py-24">
        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
        <p className="text-muted-foreground">Add books from the catalog to view them here.</p>
        <Button asChild className="mt-6">
          <Link href="/catalog">Back to Catalog</Link>
        </Button>
      </div>
    );
  }

  return (
    <section className="overflow-x-auto">
      <table className="min-w-full divide-y divide-border bg-transparent text-left">
        <thead>
          <tr>
            <th className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">Book</th>
            <th className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">Author</th>
            <th className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">Price</th>
            <th className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">Quantity</th>
            <th className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">Stock</th>
            <th className="px-3 py-2 text-xs font-semibold uppercase text-muted-foreground">Total</th>
            <th className="w-8 px-3 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, idx) => (
            <tr key={item.bookId} className="border-b last:border-b-0 align-middle">
              <td className="px-3 py-3">
                <Link href={item.href} className="flex items-center gap-2">
                  <Image
                    src={item.imageUrl}
                    width={48}
                    height={60}
                    alt={item.title}
                    className="rounded shadow-sm border"
                    unoptimized
                  />
                  <span className="font-medium line-clamp-2">{item.title}</span>
                </Link>
              </td>
              <td className="px-3 py-3 text-muted-foreground text-sm">{item.author}</td>
              <td className="px-3 py-3 text-primary font-bold">
                <Price amount={item.price} />
              </td>
              <td className="px-3 py-3">
                <QuantityStepper
                  value={item.quantity}
                  min={1}
                  max={item.stock}
                  onChange={(v) => updateQty(idx, v)}
                />
              </td>
              <td className="px-3 py-3"><StockBadge stock={item.stock} /></td>
              <td className="px-3 py-3 font-medium">
                <Price amount={item.price * item.quantity} />
              </td>
              <td className="px-3 py-3">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  aria-label="Remove"
                  className="text-destructive hover:bg-red-50"
                  onClick={() => removeItem(idx)}
                >
                  ×
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Cart summary */}
      <div className="mt-8 max-w-md ml-auto border rounded-xl p-6 bg-muted flex flex-col gap-3 text-base">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span><Price amount={subtotal} /></span>
        </div>
        <div className="flex justify-between">
          <span>Estimated shipping</span>
          <span><Price amount={shipping} /></span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span><Price amount={tax} /></span>
        </div>
        <hr className="my-2 border-border" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total</span>
          <span><Price amount={total} /></span>
        </div>
        <Button asChild className="mt-5 w-full">
          <Link href="/checkout">Continue to checkout</Link>
        </Button>
        <span className="text-xs text-muted-foreground text-center mt-3">Shipping calculated at checkout. Typical delivery: 2–4 business days.</span>
      </div>
    </section>
  );
}
