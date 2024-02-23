type Store = {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  image_url?: string;
  products: Product[];
  created_at: string;
  updated_at: string;
};
