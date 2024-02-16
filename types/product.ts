type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  store_id: string;
  is_published: boolean;
  product_images: ProductImage[];
  created_at: string;
  updated_at: string;
};

type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  created_at: string;
  updated_at: string;
};
