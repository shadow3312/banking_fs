import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} from "@jest/globals";
import { addBank, editBank, getBank, listBanks, removeBank } from ".";
import { makeDb, models } from "@/infrastructure/data/config";
import { cleanBankObject, bankObject, bankObject2 } from "@/shared/utils/const";
import { Sequelize } from "sequelize";
describe("Bank usecases", () => {
  let db: Sequelize;

  beforeAll(async () => {
    db = await makeDb();
  }, 10000);

  afterEach(async () => {
    await models.Bank.destroy({ where: {} });
  });

  afterAll(async () => {
    await models.Bank.destroy({ where: {} });
    await db.close();
  });

  it("should list all banks", async () => {
    await models.Bank.create(bankObject);
    await models.Bank.create(bankObject2);
    const banks = await listBanks();

    expect(banks).toHaveLength(2);
    expect(banks[1]).toEqual(bankObject);
    expect(banks[0]).toEqual(bankObject2);
  });

  it("should add a bank", async () => {
    const bank = await addBank(cleanBankObject);

    expect(bank.id).toBeDefined();
    expect(bank).toMatchObject(cleanBankObject);
  });

  it("should get a bank by id", async () => {
    await models.Bank.create(bankObject2);
    const bank = await getBank(bankObject2.id);

    expect(bank.id).toBeDefined();
    expect(bank.accessToken).toBe(bankObject2.accessToken);
    expect(bank.fundingSourceUrl).toBe(bankObject2.fundingSourceUrl);
  });

  it("should edit a bank by id", async () => {
    await models.Bank.create(bankObject);
    const newData: Partial<IBank> = {
      accountId: "3sgsdgack5ddf",
      publicId: "dfhhjjeaj7gf",
    };

    const bank = await editBank(bankObject.id, newData);

    expect(bank.id).toBe(bankObject.id);
    expect(bank.accountId).toBe(newData.accountId);
    expect(bank.publicId).toBe(newData.publicId);
  });

  it("should remove an existing bank", async () => {
    const bank = await models.Bank.create(bankObject);
    await removeBank(bank.id);
    const deletedBank = await models.Bank.findByPk(bank.id);
    expect(deletedBank).toBeNull();
  });
});
