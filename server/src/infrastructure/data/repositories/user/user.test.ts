import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
} from "@jest/globals";
import { Sequelize } from "sequelize";
import { makeDb, models } from "../../config";
import makeUserRepository from "./user";
import makeFakeUser from "~/user";
import makeUser from "@/domain/entities/user";
import userToObject from "../../adapters/user";
import userRepository from ".";

describe("User repository", () => {
  let db: Sequelize;

  beforeAll(async () => {
    db = await makeDb();
  });

  afterEach(async () => {
    await models.User.destroy({ where: {} });
  });

  afterAll(async () => {
    await db.drop();
    await db.close();
  });

  it("can list all users", async () => {
    const data1 = makeFakeUser();
    const data2 = makeFakeUser();
    const user1 = makeUser(data1);
    const user2 = makeUser(data2);
    const userObj1 = userToObject(user1);
    const userObj2 = userToObject(user2);
    const inserts = await Promise.all(
      [userObj1, userObj2].map(userRepository.create)
    );
    const found = await userRepository.findAll();

    expect.assertions(inserts.length);

    return inserts.forEach((insert) => expect(found).toContainEqual(insert));
  });
});
