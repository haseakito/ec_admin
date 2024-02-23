import { auth } from "@clerk/nextjs";
import qs from "query-string";

interface FetchProductsQuery {
  storeId: string;
  offset?: number;
}

export async function fetchProducts(
  query: FetchProductsQuery
): Promise<Product[]> {
  const { getToken } = auth();

  const url = qs.stringifyUrl({
    url:
      process.env.NEXT_PUBLIC_API_URL +
      `/admin/stores/${query.storeId}/products`,
    query: {
      offset: query.offset ? query.offset : 0,
    },
  });

  // GET request to fetch all stores
  const res = await fetch(url, {
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
