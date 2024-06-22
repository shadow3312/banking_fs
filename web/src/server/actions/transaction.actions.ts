"use server";

import { api } from "@/trpc/server";

export async function createTransaction(transactionData: ITransactionCreate) {
  try {
    const transaction = await api.transactions.create.mutate({
      ...transactionData,
      channel: "Online",
      category: "Transfer",
    });

    return transaction;
  } catch (error) {
    console.log(`Failed to create transaction ${error}`);
  }
}

export async function getTransactionsByBankId({ bankId }: { bankId: string }) {
  try {
    const incomes = await api.transactions.getByReceiverBankId.query(bankId);

    const outcomes = await api.transactions.getBySenderBankId.query(bankId);

    const transactions = {
      total: incomes.length + outcomes.length,
      data: [...incomes, ...outcomes],
    };

    return transactions;
  } catch (error) {
    console.log(`Failed to get transactions by bankId ${error}`);
  }
}
