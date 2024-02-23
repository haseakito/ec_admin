"use client";

import { useEffect, useState } from "react";
import { Container } from "@/components/ui/container";
import { useCartStore } from "@/hooks/use-cart-store";
import { CartItem } from "./components/cart-item";
import { Summary } from "./components/summary";

export default function CartPage() {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCartStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Shopping Cart</h1>
          <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12">
            <div className="lg:col-span-7">
              {cart.items.length === 0 && (
                <p className="text-neutral-500">No Items found in cart.</p>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} product={item} />
                ))}
              </ul>
            </div>
            <Summary />
          </div>
        </div>
      </Container>
    </div>
  );
}
