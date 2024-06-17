"use server";

import { AccountBase, CountryCode } from "plaid";
import plaidClient from "../plaid";
import { getUserBanks } from "./user.actions";

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
