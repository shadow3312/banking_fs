import express from "express";
import morgan from "morgan";
import env from "./env";
import { makeDb, sequelize } from "@/infrastructure/data/config";
import {
  authRouter,
  bankRouter,
  transactionRouter,
  userRouter,
} from "./presentation/routes";
const app = express();
const port = env.PORT || 3001;

app.use(express.json());
app.use(morgan("common"));

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/banks", bankRouter);
app.use("/transactions", transactionRouter);

app.listen(port, async () => {
  await makeDb();
  console.log(`Listening to ${port}`);
});
