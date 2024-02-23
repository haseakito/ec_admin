type Order = {
  id: string;
  store_id: string;
  user_id: string;
  is_paid: boolean;
  total_price: number;
  order_items: OrderItem[];
  created_at: string;
  updated_at: string;
};

type OrderItem = {
  id: string;
  order_id: string;
  product_id: string;
  product: Product;
};

type Revenue = {
  orders: Order[];
  total_revenue: number;
  sales_count: number;
};
