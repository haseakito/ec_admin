import React from "react";
import { ProductsClient } from "./components/client";
import { fetchProducts } from "@/services/product";
import { ProductColumn } from "./components/columns";
import { formatDate } from "@/utils/format";

interface ProductsPageProps {
  params: {
    storeId: string;
  };
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  // GET request to backend API to fetch products associated with the store
  const products: Product[] = await fetchProducts(params.storeId);

  // Format products for data table
  const formattedProducts: ProductColumn[] = products.map((product) => ({
    id: product.id,
    name: product.name,
    price: product.price,
    isPublished: product.is_published,
    createdAt: formatDate(product.created_at),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
}
