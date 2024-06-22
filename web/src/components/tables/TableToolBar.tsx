"use client";

import { X } from "lucide-react";
import { Table } from "@tanstack/react-table";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { TableViewOptions } from "./TableViewOptions";

import { statuses } from "../../config/data";
import { TableFilter } from "./TableFilter";

interface TableToolbarProps<TData> {
  table: Table<TData>;
}

export function TableToolbar<TData>({ table }: TableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter transactions..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] dark:placeholder:text-gray-400 lg:w-[250px]"
        />
        {table.getColumn("status") && (
          <TableFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <TableViewOptions table={table} />
    </div>
  );
}
