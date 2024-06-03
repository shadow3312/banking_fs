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

  const userObject: IUser = {
    id: "wj3ojndioo0ejkl",
    firstName: "John",
    lastName: "Doe",
    city: "New York",
    email: "email@gmail.com",
    dwollaCustomerId: "c43ndnjuwi3nndb",
    dwollaCustomerUrl: "random-url",
  };
  const userObject2: IUser = {
    id: "zk2ojndbfho0epsk",
    firstName: "Mack",
    lastName: "Jeff",
    city: "London",
    email: "email@gmail.com",
    dwollaCustomerId: "c43ndnjuwi3nndb",
    dwollaCustomerUrl: "random-url",
  };

  afterAll(async () => {
    await db.drop();
    await db.close();
  });

  describe("findAll", () => {
    it("should return all users", async () => {
      const user1 = await models.User.create(userObject);
      const user2 = await models.User.create(userObject2);

      const results = await userRepository.findAll();

      expect(results).toHaveLength(2);
      expect(results[0]).toEqual(userObject);
    });
  });

  describe("findByPk", () => {
    it("should return a user if found", async () => {
      const user = await models.User.create(userObject);

      const result = await userRepository.findById("wj3ojndioo0ejkl");

      expect(result).toEqual(userObject);
    });
    it("should throw an error if user not found", async () => {
      await expect(userRepository.findById("fake")).rejects.toThrow(
        "Failed to find user by ID"
      );
    });
  });

  describe("create", () => {
    it("should create a user", async () => {
      const result = await userRepository.create(userObject);

      expect(result).toEqual(userObject);
    });
  });
});
