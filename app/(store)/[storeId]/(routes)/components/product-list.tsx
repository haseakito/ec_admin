import { ProductCard } from "./product-card";

interface ProductListProps {
  title: string;
  products: Product[];
}

export const ProductList: React.FC<ProductListProps> = ({
  title,
  products,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-bold text-3xl">{title}</h3>
      {products.length === 0 && (
        <div className="flex items-center justify-center h-full w-full text-neutral-500">
          No results found.
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
