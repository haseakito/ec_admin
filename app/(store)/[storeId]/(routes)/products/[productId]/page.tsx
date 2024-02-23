import { Container } from "@/components/ui/container";
import { fetchProduct } from "@/services/product";
import { Gallery } from "./components/gallery";
import { ProductInfo } from "./components/product-info";

interface ProductPageProps {
  params: {
    storeId: string,
    productId: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  // Fetch product with the product id
  const product = await fetchProduct(params.productId);

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            <Gallery images={product.product_images} />
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                <ProductInfo product={product} />
            </div>
          </div>
          <hr className="my-10" />
          {/* Suggested product lists */}
          <div></div>
          {/* Review sections */}
          <div></div>
        </div>
      </Container>
    </div>
  );
}
