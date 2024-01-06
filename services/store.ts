import { Store } from "@/types/store"
import { auth } from "@clerk/nextjs"

export async function fetchStores(user_id?: string) {
    const { getToken } = auth()

    // Base url
    const url = user_id ? `/api/store?user_id=${user_id}` : "/api/store"

    // GET request to fetch all stores
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + url, {
        method: "GET",
        mode: "cors",
        headers: {
            "Authorization": `Bearer ${await getToken()}`
        },
    })

    if (!res.ok) {
        throw new Error()
    }

    // Parse json body
    const body = await res.json()

    return body.data
}

export async function fetchStore(storeId: string) {
    const { getToken } = auth()

    // GET request to fetch a specific store with store id provided
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/store/${storeId}`, {
        method: "GET",
        mode: "cors",
        headers: {
            "Authorization": `Bearer ${await getToken()}`
        },
    })

    // Parse json body
    const body = await res.json()

    return body.data
}