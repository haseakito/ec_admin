"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { Trash } from "lucide-react";

import { AlertModal } from "@/components/modals/alert-modal";

interface ProductTitleProps {
  product: Product;
}

export function ProductTitle({ product }: ProductTitleProps) {
  const { getToken } = useAuth();

  // Boolean state handling modal state
  const [open, setOpen] = useState(false);

  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Hooks handling dynamic params
  const params = useParams();

  // Hooks handling router
  const router = useRouter();

  // If there's already a product, change the text
  const title = product ? "Edit a product" : "Create a new product";
  const description = product ? "Edit a product." : "Add a new product";

  // Asynchronous function handling deleting the product
  const onDelete = async () => {
    try {
      // set loading state to be true during API call
      setLoading(true);

      // DELETE request to backend API
      await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `/admin/products/${params.productId}`,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      // Refresh the page to update content
      router.refresh();

      // Redirect the user to products overview page
      router.push(`/admin/${params.storeId}/products`);

      // Show successful toast
      toast.success("Successfully deleted the product");
    } catch (error: any) {
      // Show alert toast if the request failed
      toast.error("Ooops! Something went wrong with your request.");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <div className="flex items-center justify-between mb-3">
        <Heading title={title} description={description} />
        {product && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />
    </>
  );
}
