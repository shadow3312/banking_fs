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
  DB_USER: str({ default: "" }),
  DB_PASS: str({ default: "" }),
  DB_NAME: str({ default: "" }),
  DB_HOST: str({ default: "" }),
  DB_DIALECT: str({
    choices: [
      "mysql",
      "mariadb",
      "postgres",
      "sqlite",
      "mssql",
      "db2",
      "snowflake",
      "oracle",
    ],
    default: "mysql",
  }),
});

export default env;
