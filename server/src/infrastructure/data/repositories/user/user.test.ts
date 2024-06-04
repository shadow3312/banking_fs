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
import userRepository from ".";
import { userObject, userObject2 } from "@/shared/utils/const";

describe("User repository", () => {
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

  describe("findAll", () => {
    it("should return all users", async () => {
      await models.User.create(userObject);
      await models.User.create(userObject2);

      const results = await userRepository.findAll();

      expect(results).toHaveLength(2);
      expect(results[0]).toEqual(userObject);
    });
  });

  describe("findByPk", () => {
    it("should return a user if found", async () => {
      await models.User.create(userObject);

      const result = await userRepository.findById("wj3ojndioo0ejkl");

      expect(result).toEqual(userObject);
    });
    it("should return null if user not found", async () => {
      const found = await userRepository.findById("fake");
      expect(found).toBeNull();
    });
  });

  describe("create", () => {
    it("should create a user", async () => {
      const result = await userRepository.create(userObject);

      expect(result).toEqual(userObject);
    });
  });

  describe("update", () => {
    it("should update an existing user", async () => {
      const user = await models.User.create(userObject);
      const newData = {
        lastName: "Marc",
        email: "new@gmail.com",
      };
      const updatedUser = await userRepository.update(user.id, newData);

      expect(updatedUser).toEqual(expect.objectContaining(newData));
    });
  });

  describe("remove", () => {
    it("should remove an existing user", async () => {
      const user = await models.User.create(userObject);

      await userRepository.remove(user.id);

      const deletedUser = await models.User.findByPk(user.id);
      expect(deletedUser).toBeNull();
    });
  });
});
