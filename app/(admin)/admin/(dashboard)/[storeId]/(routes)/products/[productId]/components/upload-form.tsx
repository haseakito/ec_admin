"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import Image from "next/image";

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
import { Progress } from "@/components/ui/progress";

import { Trash } from "lucide-react";

interface UploadFormProps {
  product: Product;
}

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"];

const formSchema = z.object({
  images: z
    .custom<FileList>()
    .refine((files) => files.length !== 0, { message: "File is required" })
    .refine((files) => files.length < 4, {
      message: "You can upload no more than 4 images",
    })
    .transform((files) => Array.from(files))
    .refine((files) => {
      return files.every((file) => file.size < 100000, {
        message: "File size should be no longer than 1MB",
      });
    })
    .refine((files) => {
      return files.every((file) => ALLOWED_MIME_TYPES.includes(file.type), {
        message: "Only .jpg or .png is allowed",
      });
    }),
});

export function UploadForm({ product }: UploadFormProps) {
  const { getToken } = useAuth();

  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Number state handling file upload progress
  const [progress, setProgress] = useState(0);

  // Hooks handling dynamic params
  const params = useParams();

  // Hooks handling router
  const router = useRouter();

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const onUpload = async (files: FileList) => {
    try {
      // set loading state to be true during API call
      setLoading(true);

      // Instantiate a new form data
      const formData = new FormData();

      // Append each file to the formData
      Array.from(files).forEach((file) => {
        formData.append("images", file);
      });

      // POST request to backend API
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL +
          `/products/${params.productId}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (event) => {
            if (event.total) {
              const progress = Math.floor((event.loaded * 100) / event.total);
              setProgress(progress);
            }
          },
        }
      );

      // Show successful toast
      toast.success("Successfully uploaded the product image");

      // Refresh the page to update content
      router.refresh();
    } catch (error) {
      // Output the error to log
      console.log(error);

      // Show alert toast if the request failed
      toast.error("Ooops! Something went wrong with your request.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  // Asynchronous function handling deleting the store
  const onRemove = async (productImageId: string) => {
    try {
      // set loading state to be true during API call
      setLoading(true);

      // DELETE request to backend API
      await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `/products/${params.productId}/assets/${productImageId}`,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
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
        <form className="mt-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {/* Store image field */}
          {product.product_images.length != 0 ? (
            <div className="mb-4 flex items-center gap-4">
              {product.product_images.map((image) => (
                <div
                  key={image.url}
                  className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
                >
                  <div className="z-10 absolute top-2 right-2">
                    <Button
                      type="button"
                      onClick={() => onRemove(image.id)}
                      variant="destructive"
                      size="icon"
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                  <Image
                    fill
                    unoptimized
                    alt="product image"
                    src={image.url}
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="md:col-span-1">
              <FormField
                control={form.control}
                name="images"
                render={() => (
                  <FormItem>
                    <FormLabel>Store Image</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        multiple
                        accept="image/jpeg, image/png"
                        placeholder="Select product images"
                        type="file"
                        {...form.register("images")}
                        onChange={(e) => {
                          if (e.target.files) {
                            onUpload(e.target.files);
                          }
                        }}
                        className="col-span-full"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-2.5">
                <Progress hidden={progress === 0} value={progress} />
              </div>
            </div>
          )}
        </form>
      </Form>
    </>
  );
}
