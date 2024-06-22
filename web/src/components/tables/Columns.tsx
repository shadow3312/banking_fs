"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "../ui/badge";
import { Checkbox } from "../ui/checkbox";
import { TableColumnHeader } from "./TableColumnHeader";
import { TableRowActions } from "./TableRowActions";
import { cn, formatAmount, getTransactionStatus } from "@/lib/utils";
import { statuses } from "../../config/data";

export const columns: ColumnDef<TTransaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  //   {
  //     accessorKey: "id",
  //     header: ({ column }) => <TableColumnHeader column={column} title="Task" />,
  //     cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
  //     enableSorting: false,
  //     enableHiding: false,
  //   },
  {
    accessorKey: "name",
    header: ({ column }) => <TableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Amount" />
    ),
    cell: ({ row }) => {
      const value: number = row.getValue("amount");
      const amount = formatAmount(value);
      return (
        <div className="flex w-[100px] items-center">
          <span className={cn(amount.startsWith("-") && "text-red-600")}>
            {amount}
          </span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "status",
    accessorFn: (row) => getTransactionStatus(new Date(row.createdAt)),
    enableColumnFilter: true,
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const statusText: string = row.getValue("status");
      const status = statuses.find(
        (status) => status.value == statusText.toLowerCase(),
      );
      if (!status) return null;
      return (
        <div className="flex w-[100px] items-center">
          <Badge
            className={cn(
              "flex",
              status.value === "success" ? "bg-green-600" : "bg-secondary",
            )}
          >
            {status.icon && (
              <status.icon className="mr-2 h-4 w-4  text-gray-300 dark:text-muted" />
            )}
            {statusText}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const rowValue: string = row.getValue(id);
      return value.includes(rowValue.toLowerCase());
    },
  },
  {
    id: "category",
    accessorFn: (row) =>
      `${row.category.primary || (row.category as unknown as string)}`,
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center">
          <Badge variant={"outline"}>{row.getValue("category")}</Badge>
          <p>{row.getValue("type")}</p>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <TableRowActions row={row} />,
  },
];
