import { describe, expect, it } from "@jest/globals";
import makeFakeBank from "~/bank";
import makeBank from ".";

describe("Bank", () => {
  const bankObject: Partial<IBank> = {
    accessToken: "dnksodnvkonow3nw",
    fundingSourceUrl: "http://source.url",
    accountId: "wqojfwiqff",
    publicId: "sio32n3202d42n",
    userId: "ruri3ofn0ei49",
  };
  it("can be created", () => {
    const insert = makeFakeBank(bankObject);
    const bank = makeBank(insert);

    expect(bank.getId()).toBeDefined();
    expect(bank.getAccessToken()).toBe(bankObject.accessToken);
    expect(bank.getFundingSourceUrl()).toBe(bankObject.fundingSourceUrl);
    expect(bank.getAccountId()).toBe(bankObject.accountId);
    expect(bank.getPublicId()).toBe(bankObject.publicId);
    expect(bank.getUserId()).toBe(bankObject.userId);
  });
  it("requires a valid id", () => {
    const insert = makeFakeBank({
      id: "not a cuid",
    });

    expect(() => makeBank(insert)).toThrow(`Bank must have a valid id`);
  });
  it("requires an accessToken", () => {
    const bank = makeFakeBank({ accessToken: undefined });

    expect(() => makeBank(bank)).toThrow(`accessToken is required`);
  });
  it("requires a fundingSourceUrl", () => {
    const bank = makeFakeBank({ fundingSourceUrl: undefined });

    expect(() => makeBank(bank)).toThrow(`fundingSourceUrl is required`);
  });
  it("requires an accountId", () => {
    const bank = makeFakeBank({ accountId: undefined });

    expect(() => makeBank(bank)).toThrow(`accountId is required`);
  });
  it("requires a publicId", () => {
    const bank = makeFakeBank({ publicId: undefined });

    expect(() => makeBank(bank)).toThrow(`publicId is required`);
  });
  it("requires a userId", () => {
    const bank = makeFakeBank({ userId: undefined });

    expect(() => makeBank(bank)).toThrow(`userId is required`);
  });
});
