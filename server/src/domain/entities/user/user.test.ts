import { describe, expect, it } from "@jest/globals";
import makeFakeUser from "~/user";
import makeUser from ".";

describe("User", () => {
  it("can be created", () => {
    const insert = makeFakeUser({
      firstName: "John",
      lastName: "Doe",
    });
    const user = makeUser(insert);

    expect(user.getId()).toBeDefined();
    expect(user.getFirstName()).toBe("John");
    expect(user.getLastName()).toBe("Doe");
  });
  it("requires a valid id", () => {
    const insert = makeFakeUser({
      id: "not a cuid",
    });

    expect(() => makeUser(insert)).toThrow(`User must have a valid id`);
  });
  it("requires an email", () => {
    const user = makeFakeUser({ email: undefined });

    expect(() => makeUser(user)).toThrow(`Email is required`);
  });
  it("requires a valid email", () => {
    const user = makeFakeUser({ email: "mail@" });

    expect(() => makeUser(user)).toThrow(`Invalid email`);
  });
  it("requires a valid firstName", () => {
    const user = makeFakeUser({ firstName: "X" });

    expect(() => makeUser(user)).toThrow(
      `firstName must have at least 3 characters`
    );
  });
  it("requires a valid lastName", () => {
    const user = makeFakeUser({ lastName: "X" });

    expect(() => makeUser(user)).toThrow(
      `lastName must have at least 3 characters`
    );
  });
  it("requires a valid city", () => {
    const user = makeFakeUser({ city: "X" });

    expect(() => makeUser(user)).toThrow(
      `City must have at least 3 characters`
    );
  });
  it("requires a dwollaCustomerId", () => {
    const user = makeFakeUser({ dwollaCustomerId: undefined });

    expect(() => makeUser(user)).toThrow(`dwollaCustomerId is required`);
  });
  it("requires a dwollaCustomerUrl", () => {
    const user = makeFakeUser({ dwollaCustomerUrl: undefined });

    expect(() => makeUser(user)).toThrow(`dwollaCustomerUrl is required`);
  });
});
