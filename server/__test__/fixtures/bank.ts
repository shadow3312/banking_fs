import Id from "@/shared/utils/Id";
import { faker } from "@faker-js/faker";

export default function makeFakeBank(overrides: Partial<IBank> = {}): IBank {
  const bank: IBank = {
    id: Id.makeId(),
    accessToken: faker.string.alphanumeric(10),
    fundingSourceUrl: faker.internet.url(),
    accountId: faker.string.alphanumeric(10),
    publicId: faker.string.alphanumeric(10),
    userId: faker.string.alphanumeric(10),
  };

  return {
    ...bank,
    ...overrides,
  };
}
