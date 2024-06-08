import { addUser, getUser, listUsers } from "@/application/usecases/user";
import { authMiddleware, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { userSchema } from "./schemas";

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
  create: publicProcedure.input(userSchema).mutation(async (opts) => {
    const { input } = opts;

    const user = await addUser(input);

    return user as IUser;
  }),
});

const appRouter = router({
  users: userRouter,
});

export default appRouter;
