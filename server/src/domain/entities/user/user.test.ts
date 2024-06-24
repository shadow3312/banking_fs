import { describe, expect, it } from "@jest/globals";
import makeFakeUser from "~/user";
import makeUser from ".";
import { userObject } from "@/shared/utils/const";

describe("User", () => {
  it("can be created", () => {
    const insert = makeFakeUser(userObject);
    const user = makeUser(insert);

    expect(user.getId()).toBeDefined();
    expect(user.getFirstName()).toBe(userObject.firstName);
    expect(user.getLastName()).toBe(userObject.lastName);
    expect(user.getCity()).toBe(userObject.city);
    expect(user.getEmail()).toBe(userObject.email);
    expect(user.getAdress()).toBe(userObject.address1);
    expect(user.getCity()).toBe(userObject.city);
    expect(user.getPassword()).toBe(userObject.password);
    expect(user.getState()).toBe(userObject.state);
    expect(user.getSsn()).toBe(userObject.ssn);
    expect(user.getPostalCode()).toBe(userObject.postalCode);
    expect(user.getDwollaCustomerId()).toBe(userObject.dwollaCustomerId);
    expect(user.getDwollaCustomerUrl()).toBe(userObject.dwollaCustomerUrl);
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
