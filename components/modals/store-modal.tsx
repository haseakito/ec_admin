"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";

import { useStoreModal } from "@/hooks/use-store-modal";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Store name should be more than 3 characters long",
  }),
});

export function StoreModal() {
  const { userId, getToken } = useAuth();

  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Store modal hooks
  const storeModal = useStoreModal();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  // Asynchronous function handling submitting the form
  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      // set loading state to be true during API call
      setLoading(true);

      // POST request to the backend API
      const res = await axios.post(
        process.env.NEXT_PUBLIC_API_URL + "/stores",
        {
          name: e.name,
          user_id: userId,
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Refresh page and redirect to the store
      window.location.assign(`/admin/${res.data.id}`);

      // Show successful toast
      toast.success("Successfully created the store");
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
    <Modal
      title="Create store"
      description="Add a new store to manage products and categories"
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {/* Store name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Store Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    disabled={loading}
                    placeholder="e.g. awesome store"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-6 space-x-2 flex items-center justify-end">
            <Button
              variant="outline"
              disabled={loading}
              onClick={storeModal.onClose}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              Continue
            </Button>
          </div>
        </form>
      </Form>
    </Modal>
  );
}
