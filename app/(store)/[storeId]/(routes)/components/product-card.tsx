"use client";

import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { MouseEventHandler } from "react";

import { useCartStore } from "@/hooks/use-cart-store";
import { Button } from "@/components/ui/button";
import { Expand, ShoppingCart } from "lucide-react";
import { Currency } from "@/components/currency";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const params = useParams();
  // Hooks handling router
  const router = useRouter();

  // Hooks handling cart state
  const cart = useCartStore();

  // Function handdling redirecting the user to product detail page
  const handleClick = () => {
    router.push(`/${params.storeId}/products/${product.id}`);
  };

  // Function handling adding the item to cart
  const onAdd: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    cart.add(product);
  };

  return (
    <div className="bg-white group cursor-pointer rounded-xl border p-3 space-y-4">
      <div className="aspect-square rounded-xl bg-gray-100 relative">
        <Image
          fill
          unoptimized
          src={product.product_images[0].url}
          alt="product image"
          className="aspect-square object-cover rounded-md"
        />
        <div className="opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5">
          <div className="flex gap-x-6 justify-center">
            <Button size="icon" onClick={handleClick}>
              <Expand size={20} className="text-gray-300" />
            </Button>
            <Button size="icon" onClick={onAdd}>
              <ShoppingCart size={20} className="text-gray-300" />
            </Button>
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="font-semibold text-lg">{product.name}</p>
      </div>
      {/* Price & preview */}
      <Currency price={product.price} />
    </div>
  );
};
