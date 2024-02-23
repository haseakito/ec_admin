import { auth } from "@clerk/nextjs";

export async function fetchStores(): Promise<Store[]> {
  const { getToken } = auth();

  // GET request to fetch all stores
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/stores", {
    method: "GET",
    mode: "cors",
    headers: {
      Authorization: `Bearer ${await getToken()}`,
    },
  });

  // Parse json body
  const body = await res.json();

  return body;
}

export async function fetchStore(storeId: string): Promise<Store> {
  const { getToken } = auth();

  // GET request to fetch a specific store with store id provided
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/stores/${storeId}`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }
  );

  // Parse json body
  const body = await res.json();

  return body;
}
