import { auth } from "@clerk/nextjs"
import { redirect } from "next/navigation"

import { fetchStores } from "@/services/store"
import { Store } from "@/types/store"

export default async function SetupLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { userId } = auth()

    // If the user is not logged in, redirect the user to index page
    if (!userId) {
        redirect("/")
    }

    // Fetch all stores
    const stores: Store[] = await fetchStores()

    // If there are stores, redirect to the first store page
    if (stores) {
        redirect(`/dashboard/${stores[0].id}`)
    }

    return (
        <>
            {children}
        </>
    )
}
