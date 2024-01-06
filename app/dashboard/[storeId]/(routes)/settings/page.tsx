import { fetchStore } from "@/services/store"
import { useAuth } from "@clerk/nextjs"
import { redirect } from "next/navigation"
import { SettingsForm } from "./components/settings-form"

interface SettingsPageProps {
    params: {
        storeId: string
    }
}

export default async function SettingsPage({
    params
}: SettingsPageProps) {

    const { userId } = useAuth()

    const store = await fetchStore(params.storeId)

    if (!store) {
        redirect("/")
    }



    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm
                    store={store}
                />
            </div>
        </div>
    )
}
