interface IBank {
  id: string;
  accessToken: string;
  fundingSourceUrl: string;
  accountId: string;
  publicId: string;
  userId: string;
}

interface IUser {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  dateOfBirth: string;
  ssn: string;
  postalCode: string;
  address1: string;
  state: string;
  dwollaCustomerId: string;
  dwollaCustomerUrl: string;
}

interface ITransaction {
  id: string;
  name: string;
  email: string;
  amount: string;
  channel: string;
  category: string;
  senderId: string;
  receiverId: string;
  senderBankId: string;
  receiverBankId: string;
}

interface ILoginReturn {
  user: IUser;
  token: string;
}

interface AuthFormProps {
  type: AuthType;
}

interface IDwollaCustomer {
  firstName: string;
  lastName: string;
  email: string;
  type: string;
}

interface IRegisterPayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  city: string;
  dateOfBirth: string;
  ssn: string;
  postalCode: string;
  address1: string;
  state: string;
}

interface SidebarProps {
  user: IUser;
}

interface NavItem {
  title: string;
  href: string;
  icon: (isActive: boolean) => any;
}

interface NavLinks {
  sidebarConfig: NavItem[];
}

type AuthType = "login" | "register";
