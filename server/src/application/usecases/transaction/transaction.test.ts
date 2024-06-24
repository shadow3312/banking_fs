import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} from "@jest/globals";
import {
  addTransaction,
  editTransaction,
  getTransaction,
  listTransactions,
  removeTransaction,
} from ".";
import { makeDb, models } from "@/infrastructure/data/config";
import {
  cleanTransactionObject,
  transactionObject,
  transactionObject2,
} from "@/shared/utils/const";
import { Sequelize } from "sequelize";

describe("Transaction usecases", () => {
  let db: Sequelize;
  let currentDate = new Date().toJSON().slice(0, 10);

  beforeAll(async () => {
    db = await makeDb();
  }, 10000);

  afterEach(async () => {
    await models.Transaction.destroy({ where: {} });
  });

  afterAll(async () => {
    await models.Transaction.destroy({ where: {} });
    await db.close();
  });

  it("should list all transactions", async () => {
    await models.Transaction.create(transactionObject);
    await models.Transaction.create(transactionObject2);
    const transactions = await listTransactions();

    transactionObject.createdAt = currentDate;
    transactionObject2.createdAt = currentDate;

    expect(transactions).toHaveLength(2);
    expect(transactions[1]).toEqual(transactionObject);
    expect(transactions[0]).toEqual(transactionObject2);
  });

  it("should add a transaction", async () => {
    const transaction = await addTransaction(cleanTransactionObject);

    expect(transaction.id).toBeDefined();
    expect(transaction).toMatchObject(cleanTransactionObject);
  });

  it("should get a transaction by id", async () => {
    await models.Transaction.create(transactionObject2);
    const transaction = await getTransaction(transactionObject2.id);

    expect(transaction.id).toBeDefined();
    expect(transaction.name).toBe(transactionObject2.name);
    expect(transaction.category).toBe(transactionObject2.category);
  });

  it("should edit a transaction by id", async () => {
    await models.Transaction.create(transactionObject);
    const newData: Partial<ITransaction> = {
      name: "Jack",
      category: "online",
    };

    const transaction = await editTransaction(transactionObject.id, newData);

    expect(transaction.id).toBe(transactionObject.id);
    expect(transaction.name).toBe(newData.name);
    expect(transaction.category).toBe(newData.category);
  });

  it("should remove an existing transaction", async () => {
    const transaction = await models.Transaction.create(transactionObject);
    await removeTransaction(transaction.id);
    const deletedTransaction = await models.Transaction.findByPk(
      transaction.id
    );
    expect(deletedTransaction).toBeNull();
  });
});
