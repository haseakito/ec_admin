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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface SettingsFormProps {
  store: Store;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, "Name should not be empty")
    .max(30, "Name should be no longer than 30 characters"),
  description: z
    .string()
    .max(1000, "Description should be no longer than 1000 characters"),
});

export function SettingsForm({ store }: SettingsFormProps) {
  const { getToken } = useAuth();

  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Hooks handling dynamic params
  const params = useParams();

  // Hooks handling router
  const router = useRouter();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: store,
  });

  // Asynchronous function handling submitting the form
  const onSubmit = async (e: z.infer<typeof formSchema>) => {
    try {
      // set loading state to be true during API call
      setLoading(true);

      // PATCH request to the backend API
      axios.patch(
        process.env.NEXT_PUBLIC_API_URL + `/admin/stores/${params.storeId}`,
        e,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Show successful toast
      toast.success("Successfully updated the store");

      // Refresh the page to update content
      router.refresh();
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-x-4">
          <div className="mt-3 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
            {/* Store name field */}
            <div className="col-span-full">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="store name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Store description field */}
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
                        placeholder="store description"
                        rows={5}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-10">
              <Button type="submit" disabled={loading}>
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
}
