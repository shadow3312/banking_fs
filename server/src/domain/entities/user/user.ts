export default function buildMakeUser({
  Id,
  validateEmail,
}: IBuildMakeUser): (user: Partial<IUser>) => IMakeUserMethods {
  return function makeUser({
    id = Id.makeId(),
    email,
    password,
    firstName,
    lastName,
    city,
    dateOfBirth,
    postalCode,
    ssn,
    address1,
    state,
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
    if (!password) {
      throw new Error(`Password is required`);
    }
    if (!ssn) {
      throw new Error(`Ssn is required`);
    }
    if (!state) {
      throw new Error(`State is required`);
    }
    if (!postalCode) {
      throw new Error(`Postal code is required`);
    }
    if (!address1) {
      throw new Error(`Adress is required`);
    }
    if (!dateOfBirth) {
      throw new Error(`DateOfBirth is required`);
    }
    if (password.length < 6) {
      throw new Error(`Password must have at least 6 characters`);
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
      getPassword: () => password!,
      getFirstName: () => firstName,
      getLastName: () => lastName,
      getCity: () => city,
      getDateOfBirth: () => dateOfBirth,
      getAdress: () => address1,
      getPostalCode: () => postalCode,
      getSsn: () => ssn,
      getState: () => state,
      getDwollaCustomerId: () => dwollaCustomerId,
      getDwollaCustomerUrl: () => dwollaCustomerUrl,
      setPasswordHash: (passwordHash: string) => {
        password = passwordHash;
      },
    });
  };
}
