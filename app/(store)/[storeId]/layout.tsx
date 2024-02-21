import React from "react";
import { StoreNavbar } from "./components/navbar";
import { fetchStores } from "@/services/store";

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch stores
  const stores = await fetchStores();

  return (
    <>
      <StoreNavbar stores={stores} />
      {children}
    </>
  );
}
