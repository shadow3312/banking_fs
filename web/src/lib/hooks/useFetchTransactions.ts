"use client";

import { getBankAccount, getBankAccounts } from "@/server/actions/bank.actions";
import { selectedBankAtom } from "@/state/atom";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

interface Transaction {
  id: string;
  name: string;
  amount: number;
  channel: string;
  category: {
    confidence_level: string;
    detailed: string;
    primary: string;
  };
  createdAt: string;
}

export function useFetchTransaction(user: IUser) {
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const selectedBank = useRecoilValue(selectedBankAtom);

  const fetchTransactions = async () => {
    setIsLoading(true);
    const bankAccounts = await getBankAccounts({ userId: user?.id! });
    const defaultBank = bankAccounts?.data[0];

    if (!selectedBank && !defaultBank) {
      setIsLoading(false);
      return;
    } else {
      const bankAccount = await getBankAccount({
        bankId: selectedBank?.bankId! || defaultBank?.bankId!,
      });
      setTransactions(bankAccount?.transactions as Transaction[]);
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    transactions,
    fetchTransactions,
  };
}
