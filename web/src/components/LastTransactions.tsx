"use client";

import { getBankAccount, getBankAccounts } from "@/server/actions/bank.actions";
import { selectedBankAtom } from "@/state/atom";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Spinner from "./Spinner";

export default function LastTransactions({ user }: { user: IUser }) {
  const selectedBank = useRecoilValue(selectedBankAtom);
  const [transactions, setTransactions] = useState<any[] | undefined>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransactions = async () => {
    setIsLoading(true);
    const bankAccounts = await getBankAccounts({ userId: user.id });
    const defaultBank = bankAccounts?.data[0];

    if (!selectedBank && !defaultBank) {
      setIsLoading(false);
      return;
    } else {
      const bankAccount = await getBankAccount({
        bankId: selectedBank?.bankId! || defaultBank?.bankId!,
      });
      setTransactions(bankAccount?.transactions);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedBank) {
      fetchTransactions();
    }
  }, [selectedBank]);
  return (
    <div>
      {isLoading ? (
        <Spinner />
      ) : (
        // transactions?.map((transaction, index) => (
        //   <p key={index}>{transaction.name}</p>
        // ))
        JSON.stringify(transactions, null, 4)
      )}
    </div>
  );
}
