"use client";
import { selectedBankAtom } from "@/state/atom";
import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useFetchTransaction } from "@/lib/hooks/useFetchTransactions";
import TransactionsTable from "./TransactionsTable";
import { useLoading } from "@/lib/hooks/useLoading";

export default function LastTransactions({ user }: { user: IUser }) {
  const selectedBank = useRecoilValue(selectedBankAtom);

  const {
    isLoading: loadingTransactions,
    transactions,
    fetchTransactions,
  } = useFetchTransaction(user);
  const [isLoading, setIsLoading] = useLoading("TransactionsTable");

  useEffect(() => {
    if (selectedBank || isLoading) {
      fetchTransactions();
    }
  }, [selectedBank, isLoading]);

  return (
    <div>
      <TransactionsTable
        isLoading={loadingTransactions}
        transactions={transactions}
      />
    </div>
  );
}
