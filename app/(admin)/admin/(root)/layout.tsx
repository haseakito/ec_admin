import { redirect } from "next/navigation";
import { fetchStores } from "@/services/store";

export default async function AdminIndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch all stores
  const stores: Store[] = await fetchStores();

  // If there are stores, redirect to the first store page
  if (stores) {
    redirect(`/admin/${stores[0].id}`);
  }
  return <>{children}</>;
}
