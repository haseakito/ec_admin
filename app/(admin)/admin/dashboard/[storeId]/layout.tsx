import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { fetchStore } from "@/services/store";
import { Navbar } from "./components/navbar";
import { Store } from "@/types/store";


export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode,
    params: { storeId: string }
}) {

    const { userId } = auth();

    if (!userId) {
        redirect("/")
    }

    // 
    const store: Store = await fetchStore(params.storeId)

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}