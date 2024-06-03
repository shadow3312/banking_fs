import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} from "@jest/globals";
import { Sequelize } from "sequelize";
import { makeDb, models } from "../../config";
import transactionRepository from ".";

describe("Transaction repository", () => {
  let db: Sequelize;

  beforeAll(async () => {
    db = await makeDb();
  });

  afterEach(async () => {
    await models.Transaction.destroy({ where: {} });
  });

  const transactionObject: ITransaction = {
    id: "wj3ojndioo0ejkl",
    name: "John",
    email: "email@gmail.com",
    channel: "Online",
    amount: "50",
    category: "Transfer",
    senderId: "c43ndnjuwi3nndb",
    receiverId: "d54ndnjuwi3sjjkd",
    senderBankId: "dir23ndnjuwi3niew",
    receiverBankId: "d54ndnijdone",
  };

  const transactionObject2: ITransaction = {
    id: "jsi2oodj203kie9",
    name: "Jack",
    email: "email@gmail.com",
    channel: "Online",
    amount: "50",
    category: "Debit",
    senderId: "c43ndnjuwi3nndb",
    receiverId: "d54ndnjuwi3sjjkd",
    senderBankId: "dir23ndnjuwi3niew",
    receiverBankId: "d54ndnijdone",
  };

  afterAll(async () => {
    await db.drop();
    await db.close();
  });

  describe("findAll", () => {
    it("should return all transactions", async () => {
      await models.Transaction.create(transactionObject);
      await models.Transaction.create(transactionObject2);

      const results = await transactionRepository.findAll();

      expect(results).toHaveLength(2);
      expect(results[1]).toEqual(transactionObject);
    });
  });

  describe("findByPk", () => {
    it("should return a transaction if found", async () => {
      await models.Transaction.create(transactionObject);

      const result = await transactionRepository.findById("wj3ojndioo0ejkl");

      expect(result).toEqual(transactionObject);
    });
    it("should throw an error if transaction not found", async () => {
      await expect(transactionRepository.findById("fake")).rejects.toThrow(
        "Failed to find transaction by ID"
      );
    });
  });

  describe("create", () => {
    it("should create a transaction", async () => {
      const result = await transactionRepository.create(transactionObject);

      expect(result).toEqual(transactionObject);
    });
  });

  describe("update", () => {
    it("should update an existing transaction", async () => {
      const transaction = await models.Transaction.create(transactionObject);
      const newData: Partial<ITransaction> = {
        name: "Marc",
        email: "new@gmail.com",
      };
      const updatedTransaction = await transactionRepository.update(
        transaction.id,
        newData
      );

      expect(updatedTransaction).toEqual(expect.objectContaining(newData));
    });
  });

  describe("remove", () => {
    it("should remove an existing transaction", async () => {
      const transaction = await models.Transaction.create(transactionObject);

      await transactionRepository.remove(transaction.id);

      const deletedTransaction = await models.Transaction.findByPk(
        transaction.id
      );
      expect(deletedTransaction).toBeNull();
    });
  });
});
