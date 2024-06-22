"use client";

import { getBankAccount, getBankAccounts } from "@/server/actions/bank.actions";
import { loadingActivityAtom, selectedBankAtom } from "@/state/atom";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Spinner from "./Spinner";
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
