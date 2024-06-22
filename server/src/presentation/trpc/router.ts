import {
  addUser,
  getUser,
  getUserByEmail,
  listUsers,
} from "@/application/usecases/user";
import { authMiddleware, publicProcedure, router } from "./trpc";
import { z } from "zod";
import {
  bankSchema,
  loginSchema,
  registerSchema,
  transactionSchema,
} from "./schemas";
import authenticateUser from "@/application/usecases/authentication";
import {
  addBank,
  getBank,
  getBanksByAccount,
  getBanksByUser,
  listBanks,
} from "@/application/usecases/bank";
import {
  addTransaction,
  getTransaction,
  getTransactionByBank,
  getTransactionBySender,
  getTransactionsByReceiver,
  listTransactions,
} from "@/application/usecases/transaction";

const protectedProcedure = publicProcedure.use(authMiddleware);

const userRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const users = await listUsers();
    return users;
  }),
  getById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;

    const user = await getUser(input);

    return user as IUser;
  }),
  getByEmail: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;

    const user = await getUserByEmail(input);

    return user as IUser;
  }),
});

const bankRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const banks = await listBanks();
    return banks;
  }),
  getById: protectedProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;

    const bank = await getBank(input);

    return bank as IBank;
  }),
  getByUserId: protectedProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;

    const bank = await getBanksByUser(input);

    return bank as IBank[];
  }),
  getByAccountId: protectedProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;

    const bank = await getBanksByAccount(input);

    return bank as IBank;
  }),
  create: protectedProcedure.input(bankSchema).mutation(async (opts) => {
    const { input } = opts;

    const bank = await addBank(input);

    return bank as IBank;
  }),
});
const authRouter = router({
  register: publicProcedure.input(registerSchema).mutation(async (opts) => {
    const { input } = opts;

    const user = await addUser(input);

    return user as IUser;
  }),
  login: publicProcedure.input(loginSchema).mutation(async (opts) => {
    const { input } = opts;

    const user = await authenticateUser(input.email, input.password);

    return user;
  }),
});

const transactionRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const transactions = await listTransactions();
    return transactions;
  }),
  getById: protectedProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;

    const transaction = await getTransaction(input);

    return transaction as ITransaction;
  }),
  getByBankId: protectedProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;

    const transactions = await getTransactionByBank(input);

    return transactions as ITransaction[];
  }),
  getBySenderBankId: protectedProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;

      const transactions = await getTransactionBySender(input);

      return transactions as ITransaction[];
    }),
  getByReceiverBankId: protectedProcedure
    .input(z.string())
    .query(async (opts) => {
      const { input } = opts;

      const transactions = await getTransactionsByReceiver(input);

      return transactions as ITransaction[];
    }),
  create: protectedProcedure.input(transactionSchema).mutation(async (opts) => {
    const { input } = opts;

    const transaction = await addTransaction(input);

    return transaction as ITransaction;
  }),
});
const appRouter = router({
  auth: authRouter,
  users: userRouter,
  banks: bankRouter,
  transactions: transactionRouter,
});

export default appRouter;
