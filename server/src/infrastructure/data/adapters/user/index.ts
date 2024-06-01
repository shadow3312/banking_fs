export default function userToObject(user: IMakeUserMethods): IUser {
  return Object.freeze({
    id: user.getId(),
    firstName: user.getFirstName(),
    lastName: user.getLastName(),
    email: user.getEmail(),
    city: user.getCity(),
    dwollaCustomerId: user.getDwollaCustomerId(),
    dwollaCustomerUrl: user.getDwollaCustomerUrl(),
  });
}
