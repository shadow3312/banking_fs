import React from "react";
import LoadingOverlay from "./LoadingOverlay";
import { CustomTable } from "./tables/CustomTable";
import { columns } from "./tables/Columns";
import { cn } from "@/lib/utils";

interface TransactionTableProps {
  transactions: TTransaction[];
  isLoading?: boolean;
}
export default function TransactionsTable({
  transactions,
  isLoading = false,
}: TransactionTableProps) {
  return (
    <div className="relative">
      {isLoading && <LoadingOverlay />}
      <CustomTable
        className={cn(isLoading && "pointer-events-none opacity-40")}
        data={transactions}
        columns={columns}
      />
    </div>
  );
}
