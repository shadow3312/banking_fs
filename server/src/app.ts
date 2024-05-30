import express from "express";
import morgan from "morgan";
import env from "./env";

const app = express();
const port = env.PORT ?? 3001;

app.use(express.json());
app.use(morgan("common"));

app.listen(port, () => {
  console.log(`Listening to ${port}`);
});
