import React from "react";
import { AdminNavbar } from "./components/navbar";
import { fetchStores } from "@/services/store";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch stores
  const stores = await fetchStores();

  return (
    <>
      <AdminNavbar stores={stores} />
      {children}
    </>
  );
}
