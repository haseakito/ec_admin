import { redirect } from "next/navigation";

import { checkRole } from "@/utils/roles";
import { Store } from "@/types/store";

import { fetchStores } from "@/services/store";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // If the user does not have the admin role, redirect them to the home page
  //   if (!checkRole("admin")) {
  //     redirect("/");
  //   }

  // Fetch all stores
  const stores: Store[] = await fetchStores();

  // If there are stores, redirect to the first store page
  if (stores) {
    redirect(`/dashboard/${stores[0].id}`);
  }

  return <>{children}</>;
}
