import { afterAll, beforeEach, describe, expect, it } from "@jest/globals";
import { makeDb } from ".";
import { Sequelize } from "sequelize";

describe("Database connection", () => {
  let db: Sequelize;

  beforeEach(async () => {
    db = await makeDb();
  });

  afterAll(async () => {
    await db.close();
  });

  it("should connect to the database", async () => {
    expect(db).toBeDefined();
    expect(db.authenticate).toBeDefined();
  });

  it("should sync the models with the database", async () => {
    const models = db.models;
    expect(models).toBeDefined();

    for (const modelName of Object.keys(models)) {
      const model = models[modelName];

      expect(model).toBeDefined();
      expect(model.sync).toBeDefined();
    }
  });
});
