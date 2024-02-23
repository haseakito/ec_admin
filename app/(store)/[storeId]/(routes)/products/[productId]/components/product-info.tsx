"use client";

import { Currency } from "@/components/currency";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/use-cart-store";
import { ShoppingCart } from "lucide-react";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo: React.FC<ProductInfoProps> = ({ product }) => {
  // Hooks handling cart state
  const cart = useCartStore();

  // Function handling adding the item to cart
  const onAdd = () => {
    cart.add(product);
  };

  return (
    <>
      <div className="mt-3 flex justify-between">
        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
        <p className="text-2xl text-gray-900">
          <Currency price={product.price} />
        </p>
      </div>
      <hr className="my-4" />
      <div>
        <h2 className="text-sm font-medium leading-6 text-gray-900">
          Description
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-700">
          {product.description}
        </p>
      </div>
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAdd} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </>
  );
};
