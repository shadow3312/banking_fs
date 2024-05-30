import Id from "@/shared/utils/Id";
import { faker } from "@faker-js/faker";

export default function makeFakeTransaction(
  overrides: Partial<ITransaction> = {}
): ITransaction {
  const transaction: ITransaction = {
    id: Id.makeId(),
    name: faker.person.firstName(),
    email: faker.internet.email(),
    amount: faker.commerce.price(),
    channel: faker.string.alpha(),
    category: faker.string.alpha(),
    senderId: faker.string.alphanumeric(),
    receiverId: faker.string.alphanumeric(),
    senderBankId: faker.string.alphanumeric(),
    receiverBankId: faker.string.alphanumeric(),
  };

  return {
    ...transaction,
    ...overrides,
  };
}
