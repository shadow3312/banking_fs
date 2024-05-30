import { describe, expect, it } from "@jest/globals";
import makeFakeTransaction from "~/transaction";
import makeTransaction from ".";

describe("Transaction", () => {
  const transactionObject: Partial<ITransaction> = {
    name: "John",
    email: "email@gmail.com",
    amount: "40",
    channel: "Online",
    category: "Transfer",
    senderId: "c43ndnjuwi3nndb",
    receiverId: "d4802803jjs2h2",
    senderBankId: "c43ndnjuwi3nndb",
    receiverBankId: "d4802803jjs2h2",
  };
  it("can be created", () => {
    const insert = makeFakeTransaction(transactionObject);
    const transaction = makeTransaction(insert);

    expect(transaction.getId()).toBeDefined();
    expect(transaction.getName()).toBe(transactionObject.name);
    expect(transaction.getEmail()).toBe(transactionObject.email);
    expect(transaction.getAmount()).toBe(transactionObject.amount);
    expect(transaction.getChannel()).toBe(transactionObject.channel);
    expect(transaction.getCategory()).toBe(transactionObject.category);
    expect(transaction.getSenderId()).toBe(transactionObject.senderId);
    expect(transaction.getReceiverId()).toBe(transactionObject.receiverId);
    expect(transaction.getSenderBankId()).toBe(transactionObject.senderBankId);
    expect(transaction.getReceiverBankId()).toBe(
      transactionObject.receiverBankId
    );
  });
  it("requires a valid id", () => {
    const insert = makeFakeTransaction({
      id: "not a cuid",
    });

    expect(() => makeTransaction(insert)).toThrow(
      `Transaction must have a valid id`
    );
  });
  it("requires an email", () => {
    const transaction = makeFakeTransaction({ email: undefined });

    expect(() => makeTransaction(transaction)).toThrow(`Email is required`);
  });
  it("requires a valid email", () => {
    const transaction = makeFakeTransaction({ email: "mail@" });

    expect(() => makeTransaction(transaction)).toThrow(`Invalid email`);
  });
  it("requires a valid name", () => {
    const transaction = makeFakeTransaction({ name: "X" });

    expect(() => makeTransaction(transaction)).toThrow(
      `Name must have at least 3 characters`
    );
  });
  it("requires an amount", () => {
    const transaction = makeFakeTransaction({ amount: undefined });

    expect(() => makeTransaction(transaction)).toThrow(`Amount is required`);
  });
  it("requires a channel", () => {
    const transaction = makeFakeTransaction({ channel: undefined });

    expect(() => makeTransaction(transaction)).toThrow(`Channel is required`);
  });
  it("requires a category", () => {
    const transaction = makeFakeTransaction({ category: undefined });

    expect(() => makeTransaction(transaction)).toThrow(`Category is required`);
  });
  it("requires a senderId", () => {
    const transaction = makeFakeTransaction({ senderId: undefined });

    expect(() => makeTransaction(transaction)).toThrow(`senderId is required`);
  });
  it("requires a receiverId", () => {
    const transaction = makeFakeTransaction({ receiverId: undefined });

    expect(() => makeTransaction(transaction)).toThrow(
      `receiverId is required`
    );
  });
  it("requires a senderBankId", () => {
    const transaction = makeFakeTransaction({ senderBankId: undefined });

    expect(() => makeTransaction(transaction)).toThrow(
      `senderBankId is required`
    );
  });
  it("requires a receiverBankId", () => {
    const transaction = makeFakeTransaction({ receiverBankId: undefined });

    expect(() => makeTransaction(transaction)).toThrow(
      `receiverBankId is required`
    );
  });
});
