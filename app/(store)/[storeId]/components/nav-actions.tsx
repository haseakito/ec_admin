"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/use-cart-store";
import { ShoppingBag } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function NavigationActions() {
  // Boolean state handling the mount state
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Hooks handling dynamic params
  const params = useParams();

  // Hooks handling router
  const router = useRouter();

  // Hooks handling cart state
  const cart = useCartStore();

  if (!isMounted) {
    return null;
  }

  return (
    <div className="ml-auto flex items-center gap-x-4">
      <Button
        onClick={() => router.push(`/${params.storeId}/cart`)}
        size="sm"
        className="flex items-center rounded-full bg-black px-5"
      >
        <ShoppingBag size={18} color="white" />
        <span className="ml-2 text-sm font-medium text-white">
          {cart.items.length}
        </span>
      </Button>
    </div>
  );
}
