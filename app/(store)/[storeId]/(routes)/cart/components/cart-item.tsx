import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Currency } from "@/components/currency";
import { useCartStore } from "@/hooks/use-cart-store";

import { X } from "lucide-react";

interface CartItemProps {
  product: Product;
}

export const CartItem: React.FC<CartItemProps> = ({ product }) => {
  // Hooks handling cart store
  const cart = useCartStore();

  // Function handling removing the selected item from cart
  const onRemove = () => {
    cart.remove(product.id);
  };

  return (
    <li className="flex py-6 border-b">
      <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-48 sm:w-48">
        <Image
          fill
          unoptimized
          src={product.product_images[0].url}
          alt="product image"
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute z-10 right-0 top-0">
          <Button size="icon" onClick={onRemove}>
            <X size={15} />
          </Button>
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className=" text-lg font-semibold text-black">{product.name}</p>
          </div>

          <Currency price={product.price} />
        </div>
      </div>
    </li>
  );
};
