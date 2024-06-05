import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  it,
} from "@jest/globals";
import { addUser, editUser, getUser, listUsers, removeUser } from ".";
import { makeDb, models } from "@/infrastructure/data/config";
import { cleanUserObject, userObject, userObject2 } from "@/shared/utils/const";
import { Sequelize } from "sequelize";
describe("User usecases", () => {
  let db: Sequelize;

  beforeAll(async () => {
    db = await makeDb();
  });

  afterEach(async () => {
    await models.User.destroy({ where: {} });
  });

  afterAll(async () => {
    await models.User.destroy({ where: {} });
    await db.close();
  });

  it("should list all users", async () => {
    await models.User.create(userObject);
    await models.User.create(userObject2);
    const users = await listUsers();

    expect(users).toHaveLength(2);
    expect(users[0]).toEqual(userObject);
    expect(users[1]).toEqual(userObject2);
  });

  it("should add a user", async () => {
    const user = await addUser(cleanUserObject);

    expect(user.id).toBeDefined();
    expect(user).toMatchObject(cleanUserObject);
  });

  it("should get a user by id", async () => {
    await models.User.create(userObject2);
    const user = await getUser(userObject2.id);

    expect(user.id).toBeDefined();
    expect(user.firstName).toBe(userObject2.firstName);
    expect(user.lastName).toBe(userObject2.lastName);
  });

  it("should edit a user by id", async () => {
    await models.User.create(userObject);
    const newData: Partial<IUser> = {
      firstName: "Jack",
      city: "Berlin",
    };

    const user = await editUser(userObject.id, newData);

    expect(user.id).toBe(userObject.id);
    expect(user.firstName).toBe(newData.firstName);
    expect(user.city).toBe(newData.city);
  });

  it("should remove an existing user", async () => {
    const user = await models.User.create(userObject);
    await removeUser(user.id);
    const deletedUser = await models.User.findByPk(user.id);
    expect(deletedUser).toBeNull();
  });
});
