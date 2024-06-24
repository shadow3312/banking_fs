import Id from "@/shared/utils/Id";
import { faker } from "@faker-js/faker";

export default function makeFakeUser(overrides: Partial<IUser> = {}): IUser {
  const user: IUser = {
    id: Id.makeId(),
    email: faker.internet.email(),
    password: faker.string.alphanumeric(6),
    address1: faker.location.street(),
    ssn: faker.string.numeric(),
    postalCode: faker.string.alphanumeric(),
    dateOfBirth: faker.date.birthdate().toDateString(),
    state: faker.location.state(),
    city: faker.location.city(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dwollaCustomerId: faker.string.alphanumeric(),
    dwollaCustomerUrl: faker.string.alphanumeric(),
  };

  return {
    ...user,
    ...overrides,
  };
}
