import express from "express";
import morgan from "morgan";
import env from "./env";
import { dev } from "@/domain/entities/user/user";
const app = express();
const port = env.PORT ?? 3001;

app.use(express.json());
app.use(morgan("common"));

app.listen(port, () => {
  console.log(`Listening to ${port} ${dev}`);
});
