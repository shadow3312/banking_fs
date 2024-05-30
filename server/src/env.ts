import { cleanEnv, str } from "envalid";
import dotenv from "dotenv";

dotenv.config();

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ["development", "production", "test"],
    default: "development",
  }),
  PORT: str({ default: "" }),
  JWT_SECRET: str({ default: "" }),
});

export default env;
