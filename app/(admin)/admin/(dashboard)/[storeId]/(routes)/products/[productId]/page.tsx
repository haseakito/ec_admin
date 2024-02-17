import { fetchProduct } from "@/services/product";
import { ProductForm } from "./components/product-form";
import { ProductTitle } from "./components/title";
import { UploadForm } from "./components/upload-form";

interface ProductPageProps {
  params: {
    storeId: string;
    productId: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Fetch product with product id
  const product = await fetchProduct(params.productId);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div>
          <ProductTitle product={product} />
          <UploadForm product={product} />
          <ProductForm product={product} />
        </div>
      </div>
    </div>
  );
}
