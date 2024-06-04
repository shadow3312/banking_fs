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
import transactionRepository from ".";

describe("Transaction repository", () => {
  let db: Sequelize;

  beforeEach(async () => {
    db = await makeDb();
  }, 10000);

  afterEach(async () => {
    await models.Transaction.destroy({ where: {} });
  });

  afterAll(async () => {
    await db.close();
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
    it("should return null if transaction not found", async () => {
      const found = await transactionRepository.findById("fake");
      expect(found).toBeNull();
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
