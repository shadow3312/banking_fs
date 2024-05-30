interface IBuildMakeUser {
  Id: IId;
  validateEmail: IValidateEmail;
}

interface IUserMethods {
  getId: () => string;
  getEmail: () => string;
  getFirstName: () => string;
  getLastName: () => string;
  getCity: () => string;
  getDwollaCustomerId: () => string;
  getDwollaCustomerUrl: () => string;
}

interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  city: string;
  dwollaCustomerId: string;
  dwollaCustomerUrl: string;
}
