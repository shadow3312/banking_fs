import Id from "@/shared/utils/Id";
import { faker } from "@faker-js/faker";

export default function makeFakeUser(overrides: Partial<IUser> = {}): IUser {
  const user: IUser = {
    id: Id.makeId(),
    email: faker.internet.email(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    city: faker.location.city(),
    dwollaCustomerId: faker.string.alphanumeric(),
    dwollaCustomerUrl: faker.string.alphanumeric(),
  };

  return {
    ...user,
    ...overrides,
  };
}
