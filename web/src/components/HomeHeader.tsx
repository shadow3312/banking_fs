"use client";

import React, { useEffect, useState } from "react";
import TransactionsChart from "./TransactionsChart";
import { useRecoilValue } from "recoil";
import { selectedBankAtom } from "@/state/atom";
import { useFetchTransaction } from "@/lib/hooks/useFetchTransactions";
import { Icons } from "./Icons";
import { formatAmount, getTransactionsStats } from "@/lib/utils";
import LoadingOverlay from "./LoadingOverlay";

export default function HomeHeader({ user }: { user: IUser }) {
  const selectedBank = useRecoilValue(selectedBankAtom);
  const { isLoading, transactions, fetchTransactions } =
    useFetchTransaction(user);

  const [transactionsStats, setTransactionsStats] = useState<IMonthlyData>();

  useEffect(() => {
    if (selectedBank) {
      fetchTransactions();
    }
  }, [selectedBank]);

  useEffect(() => {
    if (transactions) {
      const transactionsStatsData = getTransactionsStats(transactions);

      setTransactionsStats(transactionsStatsData);
    }
  }, [transactions]);

  return (
    <div className="home-header">
      <h3 className="title">
        Hi, {user?.firstName} {user?.lastName}
      </h3>
      <div className="home-stats">
        <div className="home-cards-wrapper">
          <div className="home-card">
            {isLoading && <LoadingOverlay />}
            <div>{Icons.arrowDown({})}</div>
            <div className="flex flex-col">
              <h3 className="home-card-title">Total income</h3>
              <h4 className="home-card-subtitle">
                {transactionsStats &&
                  formatAmount(transactionsStats.totalIncome)}
              </h4>
            </div>
          </div>
          <div className="home-card">
            {isLoading && <LoadingOverlay />}
            <div>{Icons.arrowUp({})}</div>
            <div className="flex flex-col">
              <h3 className="home-card-title">Total expense</h3>
              <h4 className="home-card-subtitle">
                {transactionsStats &&
                  formatAmount(transactionsStats.totalExpense)}
              </h4>
            </div>
          </div>
        </div>
        <TransactionsChart
          income={transactionsStats?.monthlyIncome}
          expense={transactionsStats?.monthlyExpense}
          labels={transactionsStats?.labels}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
