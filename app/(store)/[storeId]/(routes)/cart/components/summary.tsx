"use client";

import axios from "axios";
import { useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Currency } from "@/components/currency";
import { useCartStore } from "@/hooks/use-cart-store";

export const Summary = () => {
  const { userId, getToken } = useAuth();

  // Hooks handling query params
  const searchParams = useSearchParams();

  // Hooks handling dynamic params
  const params = useParams();

  const items = useCartStore((state) => state.items);
  const removeAll = useCartStore((state) => state.removeAll);

  // Lifecycle handling
  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Successfully completed the payment!");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Ooops there was a problem with your request");
    }
  }, [searchParams, removeAll]);

  //
  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  // Function handling checking out the cart items
  const onCheckout = async () => {
    try {
      // POST request to checkout API endpoint
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `/stores/${params.storeId}/checkout`,
        {
          user_id: userId,
          product_ids: items.map((item) => item.id),
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Refresh page and redirect to the stripe checkout page
      window.location = res.data;
    } catch (error) {
      // Output the error to log
      console.log(error);

      // Show alert toast if the request failed
      toast.error("Ooops! Something went wrong with your request.");
    }
  };

  return (
    <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
      <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
          <Currency price={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className="w-full mt-6"
      >
        Checkout
      </Button>
    </div>
  );
};
