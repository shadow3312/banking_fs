"use client";

import React, { useEffect, useState } from "react";
import TransactionsChart from "./TransactionsChart";
import { useRecoilValue } from "recoil";
import { selectedBankAtom } from "@/state/atom";
import { useFetchTransaction } from "@/lib/hooks/useFetchTransactions";
import Spinner from "./Spinner";

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

interface MonthlyData {
  incomes: number[];
  outcomes: number[];
}

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export default function HomeHeader({ user }: { user: IUser | undefined }) {
  const selectedBank = useRecoilValue(selectedBankAtom);
  const { isLoading, transactions, fetchTransactions } = useFetchTransaction(
    user!,
  );

  useEffect(() => {
    if (selectedBank) {
      fetchTransactions();
    }
  }, [selectedBank]);

  function getMonthlyData(transactions: Transaction[]): MonthlyData {
    const monthlyIncomes = Array(7).fill(0);
    const monthlyOutcomes = Array(7).fill(0);

    transactions.forEach((transaction) => {
      const date = new Date(transaction.createdAt);
      const month = date.getMonth(); // 0-based month index

      if (month >= 0 && month < 7) {
        if (transaction.amount > 0) {
          monthlyIncomes[month] += transaction.amount;
        } else {
          monthlyOutcomes[month] += Math.abs(transaction.amount);
        }
      }
    });
    return {
      incomes: monthlyIncomes,
      outcomes: monthlyOutcomes,
    };
  }
  const monthlyData = getMonthlyData(transactions);
  return (
    <div className="home-header">
      <h3 className="title">
        Hi, {user?.firstName} {user?.lastName}
      </h3>
      <TransactionsChart
        incomes={monthlyData.incomes}
        outcomes={monthlyData.outcomes}
        labels={labels}
        isLoading={isLoading}
      />
    </div>
  );
}
