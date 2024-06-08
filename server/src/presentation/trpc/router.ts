import { getUser, listUsers } from "@/application/usecases/user";
import { protectedProcedure, publicProcedure, router } from "./trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

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

const appRouter = router({
  users: userRouter,
});

export default appRouter;
