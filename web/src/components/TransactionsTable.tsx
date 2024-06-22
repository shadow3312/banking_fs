import React from "react";
import LoadingOverlay from "./LoadingOverlay";
import { CustomTable } from "./tables/Table";
import { columns } from "./tables/Columns";

interface TransactionTableProps {
  transactions: TTransaction[];
  isLoading?: boolean;
}
export default function TransactionsTable({
  transactions,
  isLoading = false,
}: TransactionTableProps) {
  console.log("transaction", transactions);
  return (
    <div className="relative">
      {isLoading && <LoadingOverlay />}
      <CustomTable data={transactions} columns={columns} />
    </div>
  );
}
