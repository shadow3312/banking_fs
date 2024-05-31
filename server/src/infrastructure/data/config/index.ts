import env from "@/env";
import dbConfig from "./db.config";
import { Sequelize } from "sequelize";

import { initializeUser } from "../models/user/user.model";

const environment: Environment = (env.NODE_ENV as Environment) || "development";
const config = dbConfig[environment];

export const sequelize = new Sequelize({
  database: config.database,
  dialect: config.dialect,
  username: config.username,
  password: config.password,
  logging: config.logging,
});

const models = {
  User: initializeUser(sequelize),
};

Object.values(models).forEach((model) => {
  if ((model as any).associate) {
    (model as any).associate();
  }
});

export async function makeDb(): Promise<Sequelize> {
  try {
    await sequelize.sync({ force: true });
    console.log("Tables synced successfully.");
    return sequelize;
  } catch (error) {
    throw new Error(`Unable to connect db: ${error}`);
  }
}

const db = async () => {
  const make = await makeDb();
  return make;
};

export { models };
export default db;
