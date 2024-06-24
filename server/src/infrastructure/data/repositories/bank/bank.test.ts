import {
  afterAll,
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import { Sequelize } from "sequelize";
import { makeDb, models } from "../../config";
import bankRepository from ".";
import { bankObject, bankObject2 } from "@/shared/utils/const";

describe("Bank repository", () => {
  let db: Sequelize;

  beforeEach(async () => {
    db = await makeDb();
  }, 10000);

  afterEach(async () => {
    await models.Bank.destroy({ where: {} });
  });

  afterAll(async () => {
    await db.close();
  });

  describe("findAll", () => {
    it("should return all banks", async () => {
      await models.Bank.create(bankObject);
      await models.Bank.create(bankObject2);

      const results = await bankRepository.findAll();

      expect(results).toHaveLength(2);
      expect(results[1]).toEqual(bankObject);
    });
  });

  describe("findByPk", () => {
    it("should return a bank if found", async () => {
      await models.Bank.create(bankObject);

      const result = await bankRepository.findById(bankObject.id);

      expect(result).toEqual(bankObject);
    });
    it("should return null if bank not found", async () => {
      const found = await bankRepository.findById("fake");
      expect(found).toBeNull();
    });
  });

  describe("findByAccountId", () => {
    it("should return banks for a given accountId", async () => {
      await models.Bank.create(bankObject);
      await models.Bank.create(bankObject2);

      const result1 = await bankRepository.findByAccountId(
        bankObject.accountId
      );
      const result2 = await bankRepository.findByAccountId(
        bankObject2.accountId
      );

      expect(result1).toEqual(bankObject);
      expect(result2).toEqual(bankObject2);
    });
    it("should return null if bank not found", async () => {
      const found = await bankRepository.findById("fake");
      expect(found).toBeNull();
    });
  });

  describe("create", () => {
    it("should create a bank", async () => {
      const result = await bankRepository.create(bankObject);

      expect(result).toEqual(bankObject);
    });
  });

  describe("update", () => {
    it("should update an existing bank", async () => {
      const bank = await models.Bank.create(bankObject);
      const newData: Partial<IBank> = {
        accessToken: "sbisciufgibs8w9=asjshai",
      };
      const updatedBank = await bankRepository.update(bank.id, newData);

      expect(updatedBank).toEqual(expect.objectContaining(newData));
    });
  });

  describe("remove", () => {
    it("should remove an existing bank", async () => {
      const bank = await models.Bank.create(bankObject);

      await bankRepository.remove(bank.id);

      const deletedBank = await models.Bank.findByPk(bank.id);
      expect(deletedBank).toBeNull();
    });
  });
});
