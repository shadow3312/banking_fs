export default function userToObject(user: IMakeUserMethods): IUser {
  return Object.freeze({
    id: user.getId(),
    firstName: user.getFirstName(),
    lastName: user.getLastName(),
    email: user.getEmail(),
    password: user.getPassword(),
    city: user.getCity(),
    dateOfBirth: user.getDateOfBirth(),
    address1: user.getAdress(),
    state: user.getState(),
    ssn: user.getSsn(),
    postalCode: user.getPostalCode(),
    dwollaCustomerId: user.getDwollaCustomerId(),
    dwollaCustomerUrl: user.getDwollaCustomerUrl(),
  });
}
