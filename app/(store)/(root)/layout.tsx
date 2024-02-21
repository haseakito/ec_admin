import { Metadata } from "next";
import { redirect } from "next/navigation";
import { fetchStores } from "@/services/store";

export const metadata: Metadata = {
  title: "Store",
  description:
    "This is a eccomerce store that normal users can purchase products.",
};

export default async function StoreIndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch all stores
  const stores = await fetchStores();

  // If there are stores, redirect to the first store page
  if (stores) {
    redirect(`/${stores[0].id}`);
  }

  return <>{children}</>;
}
