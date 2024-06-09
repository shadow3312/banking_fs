import { addUser, getUser, listUsers } from "@/application/usecases/user";
import { authMiddleware, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { loginSchema, registerSchema } from "./schemas";
import authenticateUser from "@/application/usecases/authentication";

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
  users: userRouter,
  auth: authRouter,
});

export default appRouter;
