import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export type OrderColumn = {
  id: string;
  isPaid: boolean;
  totalPrice: number;
  products: string;
  createdAt: string;
};

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Products"
    },
    {
        accessorKey: "totalPrice",
        header: "Total revenue ($)"
    },
    {
        accessorKey: "isPaid",
        header: "Paid Status",
        cell: ({ row }) => {
            const status: boolean = row.getValue("isPaid")
    
            const statusString: string = status.toString()
    
            return <Badge variant={status ? "blue" : "red"}>{statusString}</Badge>
        },
    },
    {
        accessorKey: "createdAt",
        header: "Date"
    }
];
