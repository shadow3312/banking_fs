import z from "zod";

export const registerSchema = z.object({
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  city: z.string(),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export const transactionSchema = z.object({
  name: z.string(),
  email: z.string(),
  amount: z.string(),
  channel: z.string(),
  category: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
  senderBankId: z.string(),
  receiverBankId: z.string(),
});

export const bankSchema = z.object({
  accessToken: z.string(),
  fundingSourceUrl: z.string(),
  accountId: z.string(),
  publicId: z.string(),
  userId: z.string(),
});
