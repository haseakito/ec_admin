import { Container } from "@/components/ui/container";
import { fetchProducts } from "@/services/product";
import { ProductList } from "./components/product-list";
import { Billiboard } from "./components/billiboard";
import { fetchStore } from "@/services/store";

interface StoreIndexPageProps {
  params: { storeId: string };
}

export default async function StoreIndexPage({ params }: StoreIndexPageProps) {
  // Fetch a store with the store id
  const store = await fetchStore(params.storeId);

  // Fetch products with the store id
  const products = await fetchProducts({
    storeId: params.storeId,
  });

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billiboard url={store.image_url} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Explore products" products={products} />
        </div>
      </div>
    </Container>
  );
}
