interface IUser {
  id: string;
  email: string;
  password: string;
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
  getPassword: () => string;
  getFirstName: () => string;
  getLastName: () => string;
  getCity: () => string;
  getDwollaCustomerId: () => string;
  getDwollaCustomerUrl: () => string;
  setPasswordHash: (password: string) => void;
}
