"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ActionCell } from "./action-cell";
import { Badge } from "@/components/ui/badge";

export type ProductColumn = {
  id: string;
  name: string;
  price: number;
  createdAt: string;
  isPublished: boolean;
};

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "isPublished",
    header: "Status",
    cell: ({ row }) => {
        const status: boolean = row.getValue("isPublished")

        const statusString: string = status.toString()

        return <Badge variant={status ? "blue" : "red"}>{statusString}</Badge>
    }
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell data={row.original} />,
  },
];
