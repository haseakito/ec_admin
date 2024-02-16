import { auth } from "@clerk/nextjs";

export async function fetchProducts(storeId: string) {
  const { getToken } = auth();

  // GET request to fetch all stores
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/stores/${storeId}/products`,
    {
      method: "GET",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error();
  }

  // Parse json body
  const body = await res.json();

  return body;
}

export async function fetchProduct(productId: string) {
  const { getToken } = auth();

  // GET request to fetch a specific store with store id provided
  const res = await fetch(
    process.env.NEXT_PUBLIC_API_URL + `/products/${productId}`,
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
