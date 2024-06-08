import express from "express";
import morgan from "morgan";
import env from "./env";
import { makeDb } from "@/infrastructure/data/config";
import * as trpcExpress from "@trpc/server/adapters/express";
import {
  authRouter,
  bankRouter,
  transactionRouter,
  userRouter,
} from "./presentation/http/routes";
import appRouter from "./presentation/trpc/router";
import { createCallerFactory, createContext } from "./presentation/trpc/trpc";
const app = express();
const port = env.PORT || 3001;

const createCaller = createCallerFactory(appRouter);

app.use(express.json());
app.use(morgan("common"));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/banks", bankRouter);
app.use("/transactions", transactionRouter);

app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

app.listen(port, async () => {
  await makeDb();
  console.log(`Listening to ${port}`);
});

export { createCaller };
export type AppRouter = typeof appRouter;
