import { addUser, getUser, listUsers } from "@/application/usecases/user";
import { authMiddleware, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { bankSchema, loginSchema, registerSchema } from "./schemas";
import authenticateUser from "@/application/usecases/authentication";
import { addBank, getBank, listBanks } from "@/application/usecases/bank";

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
});

const bankRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const banks = await listBanks();
    return banks;
  }),
  getById: publicProcedure.input(z.string()).query(async (opts) => {
    const { input } = opts;

    const bank = await getBank(input);

    return bank as IBank;
  }),
  create: publicProcedure.input(bankSchema).mutation(async (opts) => {
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

const appRouter = router({
  auth: authRouter,
  users: userRouter,
  banks: bankRouter,
});

export default appRouter;
