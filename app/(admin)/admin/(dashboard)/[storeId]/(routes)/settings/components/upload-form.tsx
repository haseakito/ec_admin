"use client";

import * as z from "zod";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

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
import { AlertModal } from "@/components/modals/alert-modal";

interface UploadFormProps {
  store: Store;
}

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png"];

const formSchema = z.object({
  image: z
    .custom<FileList>()
    .refine((file) => file.length !== 0, { message: "File is required" })
    .transform((files) => files[0])
    .refine((file) => file.size < 100000, {
      message: "File size should be no longer than 1MB",
    })
    .refine((file) => ALLOWED_MIME_TYPES.includes(file.type), {
      message: "Only .jpg or .png is allowed",
    }),
});

export function UploadForm({ store }: UploadFormProps) {
  const { getToken } = useAuth();

  // Boolean state handling loading during API request
  const [open, setOpen] = useState(false);

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

  const onUpload = async (e: File) => {
    const formData = new FormData();

    formData.append("image", e);

    try {
      // set loading state to be true during API call
      setLoading(true);

      // POST request to backend API
      await axios.post(
        process.env.NEXT_PUBLIC_API_URL + `/stores/${params.storeId}/upload`,
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
      toast.success("Successfully uploaded the store image");

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
  const onRemove = async () => {
    try {
      // set loading state to be true during API call
      setLoading(true);

      // DELETE request to backend API
      await axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `/stores/${params.storeId}/assets`,
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
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        description="Make sure that you want to remove this store image. Note that this action cannot be undone."
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onRemove()}
        loading={loading}
      />

      <Form {...form}>
        <form className="mt-10 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {/* Store image field */}
          {store.image_url ? (
            <div className="relative w-[200px] h-[200px] rounded-md overflow-hidden">
              <div className="z-10 absolute top-2 right-2">
                <Button
                  type="button"
                  onClick={() => setOpen(true)}
                  variant="destructive"
                  size="icon"
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
              <Image
                fill
                unoptimized
                alt="store image"
                src={store.image_url}
                className="object-cover"
              />
            </div>
          ) : (
            <div className="md:col-span-1">
              <FormField
                control={form.control}
                name="image"
                render={() => (
                  <FormItem>
                    <FormLabel>Store Image</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        accept="image/jpeg, image/png"
                        placeholder="Select a store image"
                        type="file"
                        {...form.register("image")}
                        onChange={(e) => {
                          if (e.target.files) {
                            onUpload(e.target.files[0]);
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
