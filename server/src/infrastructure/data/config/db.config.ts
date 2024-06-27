import env from "@/serverEnv";

const dbConfig: IDbConfig = {
  test: {
    username: "root",
    password: "",
    database: "banking_test",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
  development: {
    username: "root",
    password: "",
    database: "banking",
    host: "localhost",
    dialect: "mysql",
    logging: false,
  },
  production: {
    username: env.DB_USER,
    password: env.DB_PASS,
    database: env.DB_NAME,
    host: env.DB_HOST,
    dialect: env.DB_DIALECT,
    logging: false,
  },
};

export default dbConfig;
