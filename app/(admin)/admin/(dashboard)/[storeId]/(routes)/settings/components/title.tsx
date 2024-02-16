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

export function SettingsTitle() {
  const { getToken } = useAuth();

  // Boolean state handling modal state
  const [open, setOpen] = useState(false);

  // Boolean state handling loading during API request
  const [loading, setLoading] = useState(false);

  // Hooks handling dynamic params
  const params = useParams();

  // Hooks handling router
  const router = useRouter();

  // Asynchronous function handling deleting the store
  const onDelete = async () => {
    try {
      // set loading state to be true during API call
      setLoading(true);

      // PATCH request to the backend API
      axios.delete(
        process.env.NEXT_PUBLIC_API_URL + `/stores/${params.storeId}/assets`,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        }
      );

      // Show successful toast
      toast.success("Successfully deleted the store");

      // Refresh the page to update content
      router.refresh();

      // Redirect to the index page
      router.push("/");
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
      <AlertModal
        description="Make sure that you have removed all the products first. Note that this action cannot be undone."
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete}
        loading={loading}
      />

      {/* Headings */}
      <div className="flex items-center justify-between mb-3">
        <Heading title="Settings" description="Manage store settings" />
        <Button
          variant="destructive"
          size="icon"
          disabled={loading}
          onClick={() => setOpen(true)}
        >
          <Trash className="h-4 w-4" />
        </Button>
      </div>

      <Separator />
    </>
  );
}
