import { fetchRevenue } from "@/services/order";
import { formatGraph } from "@/utils/format";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Overview } from "@/components/overview";

import { CreditCard, DollarSign, Package } from "lucide-react";

interface DashboardPageProps {
  params: {
    storeId: string;
  };
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  // Fetch revenues for orders
  const res = await fetchRevenue(params.storeId);

  // TODO: Add stock count
  const stockCount = 0;

  const graphData = formatGraph(res);

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading
          title="Dashboard"
          description="Store overview. Manage your store sales."
        />
        <Separator />
        <div className="grid gap-4 grid-cols-3">
          {/* Total revenue */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{res.total_revenue}</div>
            </CardContent>
          </Card>

          {/* Sales count */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{res.sales_count}</div>
            </CardContent>
          </Card>

          {/* Stock count */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Products In Stock
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stockCount}</div>
            </CardContent>
          </Card>

          {/* Graph */}
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Overview</CardTitle>
            </CardHeader>
            <CardContent className="pl-2">
              <Overview data={graphData} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
