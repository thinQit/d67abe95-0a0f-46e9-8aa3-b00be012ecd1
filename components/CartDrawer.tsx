"use client";
import { useEffect, useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import CartLineItem from "@/components/CartLineItem";
import CartSummary from "@/components/CartSummary";

export default function CartDrawer() {
  const [open, setOpen] = useState(false);

  // You would replace the below demo count with cart count from state/store
  const [cartItems, setCartItems] = useState([
    // Example:
    // { id: "1", title: "Atomic Habits", quantity: 1, ... }
  ]);

  useEffect(() => {
    // TODO: Fetch cart items (from API/store)
    // setCartItems(fetchedCart);
  }, []);

  return (
    <>
      <Button
        aria-label="Open cart"
        variant="outline"
        className="fixed bottom-6 right-6 z-40 rounded-full shadow-lg bg-card border border-border px-5 py-3 flex items-center gap-2"
        onClick={() => setOpen(true)}
      >
        <ShoppingCart className="h-5 w-5" />
        <span className="font-semibold text-base">Cart</span>
        <span className="ml-2 rounded-full bg-primary text-primary-foreground px-2 py-0.5 text-xs font-bold">
          {cartItems.length}
        </span>
      </Button>
      {open && (
        <aside
          className="fixed inset-0 z-50 flex items-center justify-end"
          aria-modal="true"
          role="dialog"
          tabIndex={-1}
        >
          <div
            className="fixed inset-0 bg-foreground/60 transition-opacity"
            onClick={() => setOpen(false)}
            aria-label="Close cart drawer"
            tabIndex={-1}
          />
          <div className="relative bg-card w-full max-w-md h-full p-8 shadow-xl flex flex-col z-50 animate-fade-in-up">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <ShoppingCart className="h-6 w-6 text-primary" />
                Your Cart
              </h2>
              <Button variant="ghost" onClick={() => setOpen(false)} aria-label="Close cart drawer">
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto pr-2">
              {cartItems.length === 0 ? (
                <p className="text-center text-muted-foreground mt-12">Your cart is empty.</p>
              ) : (
                <div className="space-y-5">
                  {/* Example of line items mapping */}
                  {cartItems.map((item) => (
                    <CartLineItem key={item.id} {...item} />
                  ))}
                </div>
              )}
            </div>
            <div className="pt-6 border-t mt-6">
              <CartSummary cartItems={cartItems} />
              <Button
                className="mt-4 w-full"
                disabled={cartItems.length === 0}
                onClick={() => {
                  // TODO: Navigate to checkout
                  setOpen(false);
                }}
              >
                Proceed to checkout
              </Button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
