import { fetchOrders } from "@/services/admin/admin-order";
import { formatDate } from "@/utils/format";
import { OrderClient } from "./components/client";
import { OrderColumn } from "./components/columns";

interface OrdersPageProps {
  params: {
    storeId: string;
  };
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  // Fetch orders with the store id
  const orders = await fetchOrders(params.storeId);

  // Format orders for data table
  const formattedOrders: OrderColumn[] = orders.map((order) => ({
    id: order.id,
    products: order.order_items
      .map((orderItem) => orderItem.product.name)
      .join(", "),
    totalPrice: order.order_items.reduce((total, item) => {
      return total + item.product.price;
    }, 0),
    isPaid: order.is_paid,
    createdAt: formatDate(order.created_at),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <OrderClient data={formattedOrders} />
      </div>
    </div>
  );
}
