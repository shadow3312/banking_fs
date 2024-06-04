export default function buildMakeUser({
  Id,
  validateEmail,
}: IBuildMakeUser): (user: Partial<IUser>) => IMakeUserMethods {
  return function makeUser({
    id = Id.makeId(),
    email,
    firstName,
    lastName,
    city,
    dwollaCustomerId,
    dwollaCustomerUrl,
  }: Partial<IUser>): IMakeUserMethods {
    //#region field validation
    if (!Id.isValidId(id)) {
      throw new Error(`User must have a valid id`);
    }
    if (!email) {
      throw new Error(`Email is required`);
    }
    if (email && !validateEmail.isValidEmail(email)) {
      throw new Error(`Invalid email`);
    }
    if (!firstName || firstName.length < 3) {
      throw new Error(`firstName must have at least 3 characters`);
    }
    if (!lastName || lastName.length < 3) {
      throw new Error(`lastName must have at least 3 characters`);
    }
    if (!city || city.length < 3) {
      throw new Error(`City must have at least 3 characters`);
    }
    if (!dwollaCustomerId) {
      throw new Error(`dwollaCustomerId is required`);
    }
    if (!dwollaCustomerUrl) {
      throw new Error(`dwollaCustomerUrl is required`);
    }
    //#endregion

    return Object.freeze<IMakeUserMethods>({
      getId: () => id,
      getEmail: () => email,
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getCity: () => city,
      getDwollaCustomerId: () => dwollaCustomerId,
      getDwollaCustomerUrl: () => dwollaCustomerUrl,
    });
  };
}
