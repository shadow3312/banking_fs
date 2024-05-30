interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  dwollaCustomerId: string;
  dwollaCustomerUrl: string;
}

interface IBuildMakeUser {
  Id: IId;
  validateEmail: IValidateEmail;
}

interface IMakeUserMethods {
  getId: () => string;
  getEmail: () => string;
  getFirstName: () => string;
  getLastName: () => string;
  getCity: () => string;
  getDwollaCustomerId: () => string;
  getDwollaCustomerUrl: () => string;
}
