"use client";

import { getBankAccount, getBankAccounts } from "@/server/actions/bank.actions";
import { selectedBankAtom } from "@/state/atom";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Spinner from "./Spinner";
import { useFetchTransaction } from "@/lib/hooks/useFetchTransactions";
import TransactionsTable from "./TransactionsTable";

export default function LastTransactions({ user }: { user: IUser }) {
  const selectedBank = useRecoilValue(selectedBankAtom);
  const [mounted, setMounted] = useState(false);

  const { isLoading, transactions, fetchTransactions } =
    useFetchTransaction(user);

  useEffect(() => {
    fetchTransactions();
  }, [selectedBank]);

  return (
    <div>
      <TransactionsTable isLoading={isLoading} transactions={transactions} />
    </div>
  );
}
