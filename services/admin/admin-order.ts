import { auth } from "@clerk/nextjs";

export async function fetchOrders(storeId: string): Promise<Order[]> {
  const { getToken } = auth();

  // GET request to fetch all stores
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/stores/${storeId}/orders`,
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

export async function fetchRevenue(storeId: string): Promise<Revenue> {
  const { getToken } = auth();

  // GET request to fetch all stores
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/admin/stores/${storeId}/orders`,
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
