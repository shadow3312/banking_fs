"use server";

import { AccountBase, CountryCode, Transaction } from "plaid";
import plaidClient from "../plaid";
import { getUserBanks } from "./user.actions";
import { api } from "@/trpc/server";
import { getTransactionsByBankId } from "./transaction.actions";

export async function getBankAccounts({ userId }: { userId: string }) {
  try {
    // Get db user's bank accounts
    const banks = (await getUserBanks({ userId })) as any;

    // Use the access token from db user's bank account to get plaid bank account data

    const bankAccounts = (await Promise.all(
      banks?.map(async (bank: IBank) => {
        const accountResponse = await plaidClient.accountsGet({
          access_token: bank.accessToken,
        });

        const accountData: AccountBase | undefined =
          accountResponse.data.accounts[0];
        if (accountResponse) {
          // Get bank institution infos from plaid

          const bankInstitution = await getBankInfo({
            bankId: accountResponse.data.item.institution_id!,
          });

          const account = {
            id: accountData?.account_id,
            bankId: bank.id,
            bankInstitutionId: bankInstitution?.institution_id,
            publicId: bank.publicId,
            currentBalance: accountData?.balances.available,
            mask: accountData?.mask,
            name: accountData?.name,
            officialName: accountData?.official_name,
            type: accountData?.type,
            subtype: accountData?.subtype,
          };

          return account;
        }
      }),
    )) as BankInfo[];

    const totalBanks = bankAccounts?.length || 0;
    const totalBalance = bankAccounts?.reduce((total, account) => {
      return total + account!.currentBalance!;
    }, 0);

    const obj = {
      data: bankAccounts,
      totalBanks,
      totalBalance,
    };

    return obj;
  } catch (error) {
    console.log(`Failed to find bank accounts ${error}`);
  }
}

export async function getBankInfo({ bankId }: { bankId: string }) {
  try {
    const response = await plaidClient.institutionsGetById({
      country_codes: ["US"] as CountryCode[],
      institution_id: bankId,
    });

    const bankInfo = response.data.institution;

    return bankInfo;
  } catch (error) {
    console.log(`Failed to get bank infos`);
  }
}

export async function getBankAccount({ bankId }: { bankId: string }) {
  try {
    const bank = await api.banks.getById.query(bankId);

    const accountsResponse = await plaidClient.accountsGet({
      access_token: bank.accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Get transfer transactions
    const transferTransactionsData = await getTransactionsByBankId({ bankId });

    const transferTransactions = transferTransactionsData?.data.map(
      (transaction: ITransaction) => ({
        id: transaction.id,
        name: transaction.name,
        email: transaction.email,
        amount: transaction.amount,
        channel: transaction.channel,
        category: transaction.category,
        createdAt: transaction.createdAt,
        type: transaction.senderBankId === bankId ? "debit" : "credit",
      }),
    );

    // Get bank institution infos
    const bankInstitution = await getBankInfo({
      bankId: accountsResponse.data.item.institution_id!,
    });

    // Get plaid transations
    const transactions = await getTransactions({
      accessToken: bank.accessToken,
    });

    const account = {
      id: accountData?.account_id,
      bankId: bank.id,
      bankInstitutionId: bankInstitution?.institution_id,
      publicId: bank.publicId,
      currentBalance: accountData?.balances.available,
      mask: accountData?.mask,
      name: accountData?.name,
      officialName: accountData?.official_name,
      type: accountData?.type,
      subtype: accountData?.subtype,
    };

    // Sort transactions
    const allTransactions = [...transactions, ...transferTransactions!].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

    console.log("all", allTransactions);

    return { data: account, transactions: allTransactions };
  } catch (error) {
    console.log(`Failed to find bank account`);
  }
}

export async function getTransactions({
  accessToken,
}: {
  accessToken: string;
}) {
  try {
    let transactions: any = [];
    let hasMore = true;

    while (hasMore) {
      const response = await plaidClient.transactionsSync({
        access_token: accessToken,
      });

      const data = response.data;

      transactions = response.data.added.map((transaction: Transaction) => ({
        id: transaction.transaction_id,
        name: transaction.name,
        amount: transaction.amount,
        channel: transaction.payment_channel,
        category: transaction.personal_finance_category,
        createdAt: transaction.date,
      }));

      hasMore = data.has_more;
    }

    return transactions;
  } catch (error) {
    console.log(`Failed to get plaid transactions ${error}`);
  }
}
