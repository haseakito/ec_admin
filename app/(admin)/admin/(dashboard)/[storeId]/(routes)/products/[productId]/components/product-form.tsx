"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

interface ProductFormProps {
  product: Product;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name should not be empty")
    .max(255, "Name should be no longer than 255 chracters"),
  description: z
    .string()
    .max(1000, "Description should be no longer than 1000 characters"),
  price: z.coerce.number().min(1, "Price should not be empty"),
  isPublished: z.boolean().default(false).optional(),
});

export function ProductForm({ product }: ProductFormProps) {
  const { getToken } = useAuth();

  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Hooks handling dynamic params
  const params = useParams();

  // Hooks handling router
  const router = useRouter();

  // If there's already a product, change the text
  const toastMessage = product
    ? "Successfully updated the product."
    : "Successfully created the new product.";
  const action = product ? "Save changes" : "Create";

  const defaultValues = product
    ? {
        ...product,
      }
    : {
        name: "",
        price: 0,
        isPublished: false,
      };

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  // Asynchronous function handling submitting the form
  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      // set loading state to be true during API call
      setLoading(true);

      // If there's already a product, update the product
      // Otherwise, create a new product with the data provided
      if (product) {
        // PATCH request to the backend API
        axios.patch(
          process.env.NEXT_PUBLIC_API_URL + `/products/${params.productId}`,
          {
            name: e.name,
            description: e.description,
            price: e.price,
            is_published: e.isPublished,
          },
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        // PATCH request to the backend API
        axios.post(
          process.env.NEXT_PUBLIC_API_URL +
            `/stores/${params.storeId}/products`,
          {
            name: e.name,
            description: e.description,
            price: e.price,
            is_published: e.isPublished,
          },
          {
            headers: {
              Authorization: `Bearer ${await getToken()}`,
              "Content-Type": "application/json",
            },
          }
        );
      }

      // Refresh the page to update content
      router.refresh();

      // Redirect the user to product overview page
      router.push(`/admin/${params.storeId}/products`);

      // Show successful toast
      toast.success(toastMessage);
    } catch (error) {
      // Output the error to log
      console.log(error);

      // Show alert toast if the request failed
      toast.error("Ooops! Something went wrong with your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-3 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8"
        >
          {/* Product name field */}
          <div className="col-span-1/2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="text"
                      placeholder="Product name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Product description field  */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder="Product description"
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Product price field */}
          <div className="col-span-1/2">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      type="number"
                      placeholder="Product price"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Product published status field */}
          <div className="col-span-full">
            <FormField
              control={form.control}
              name="isPublished"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Published</FormLabel>
                    <FormDescription>
                      This product will appear on the store page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="mt-5">
            <Button type="submit" disabled={loading} className="ml-auto">
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
}
