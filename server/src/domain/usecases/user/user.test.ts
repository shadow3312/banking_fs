import { makeDb, models } from "@/infrastructure/data/config";
import {
  afterAll,
  describe,
  expect,
  it,
  afterEach,
  beforeEach,
} from "@jest/globals";
import { Sequelize } from "sequelize";
import userService from ".";
import { cleanUserObject, userObject, userObject2 } from "@/shared/utils/const";

describe("User service", () => {
  let db: Sequelize;

  beforeEach(async () => {
    db = await makeDb();
  });

  afterEach(async () => {
    await models.User.destroy({ where: {} });
  });

  afterAll(async () => {
    await db.close();
  });

  it("should list all users", async () => {
    await models.User.create(userObject);
    await models.User.create(userObject2);

    const results = await userService.list();

    const expectedResults = [userObject, userObject2];

    expect(results).toEqual(expectedResults);
  });

  it("should add a user", async () => {
    const insert = await userService.add(cleanUserObject);
    expect(insert).toMatchObject(cleanUserObject);
  });

  it("should get a user by ID", async () => {
    await models.User.create(userObject);
    const result = await userService.get(userObject.id);

    expect(result.id).toBe(userObject.id);
    expect(result.firstName).toBe(userObject.firstName);
  });

  it("should edit an existing user", async () => {
    await models.User.create(userObject2);
    const newData: Partial<IUser> = {
      firstName: "Yves",
      city: "Paris",
    };
    const result = await userService.edit(userObject2.id, newData);

    expect(result.id).toBe(userObject2.id);
    expect(result.firstName).toBe(newData.firstName);
    expect(result).toEqual(expect.objectContaining(newData));
  });

  it("should remove an existing user", async () => {
    await models.User.create(userObject);
    await userService.remove(userObject.id);

    const deletedUser = await models.User.findByPk(userObject.id);

    expect(deletedUser).toBeNull();
  });
});
