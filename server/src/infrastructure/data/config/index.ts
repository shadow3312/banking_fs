import env from "@/serverEnv";
import dbConfig from "./db.config";
import { Sequelize } from "sequelize";

import { initializeUser } from "../models/user.model";
import { IModels } from "@/types/infrastucture/data/repositories/export";
import { initializeTransaction } from "../models/transaction.model";
import { initializeBank } from "../models/bank.models";

const environment: Environment = (env.NODE_ENV as Environment) || "development";
const config = dbConfig[environment];

export const sequelize = new Sequelize({
  database: config.database,
  dialect: config.dialect,
  host: config.host,
  username: config.username,
  password: config.password,
  logging: config.logging,
  dialectOptions: config.dialectOptions,
});

const models: IModels = {
  User: initializeUser(sequelize),
  Transaction: initializeTransaction(sequelize),
  Bank: initializeBank(sequelize),
};

Object.values(models).forEach((model) => {
  if ((model as any).associate) {
    (model as any).associate();
  }
});

export async function makeDb(): Promise<Sequelize> {
  try {
    await sequelize.sync();
    env.NODE_ENV !== "test" && console.log("Tables synced successfully.");
    return sequelize;
  } catch (error) {
    throw new Error(`Unable to sync tables: ${error}`);
  }
}

const db = async () => {
  const make = await makeDb();
  return make;
};

export { models };
export default db;
