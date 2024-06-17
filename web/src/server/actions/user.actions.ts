"use server";

import { api } from "@/trpc/server";

export async function getUserBanks({ userId }: { userId: string }) {
  try {
    const banks = await api.banks.getByUserId.query(userId);
    return banks;
  } catch (error) {
    console.log(`Failed to get users bank accounts ${error}`);
  }
}

export async function getBank({ id }: { id: string }) {
  try {
    const banks = await api.banks.getById.query(id);
    return banks;
  } catch (error) {
    console.log(`Failed to get bank account ${error}`);
  }
}

export async function createBank({
  accessToken,
  accountId,
  fundingSourceUrl,
  publicId,
  userId,
}: IBank) {
  try {
    const bank = await api.banks.create.mutate({
      accessToken,
      fundingSourceUrl,
      accountId,
      publicId,
      userId,
    });

    return bank;
  } catch (error) {
    console.log(`Failed to create a bank account ${error}`);
  }
}
