import BankCardStack from "@/components/BankCardStack";
import LastTransactions from "@/components/LastTransactions";
import { getBankAccounts } from "@/server/actions/bank.actions";
import { getServerAuthSession } from "@/server/auth";
import React from "react";

export default async function History() {
  const session = await getServerAuthSession();
  const user = session?.user.user;
  const banks = await getBankAccounts({ userId: user?.id! });

  if (!banks) return;

  return (
    <div className="history-page">
      <div className="history-header">
        <h3 className="title">Select a bank account </h3>
        <h4 className="subtitle">to see the transactions history</h4>
      </div>
      <div className="history-banks">
        {banks && user && <BankCardStack banks={banks.data} user={user} />}
      </div>
      <div className="history-transactions">
        {user && <LastTransactions user={user} />}
      </div>
    </div>
  );
}
