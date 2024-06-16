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

interface NavProps {
  user: IUser;
}

interface NavItem {
  title: string;
  mobileTitle?: string;
  href: string;
  icon: (isActive: boolean) => any;
}

interface NavLinks {
  sidebarConfig: NavItem[];
}

interface UserAvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
}

interface BankCardProps {
  mask: string;
  balance: string;
  type?: string;
  account_name: string;
}

interface UserInfoProps {
  user: IUser;
  truncate?: boolean;
}

interface BankInfo {
  id: string;
  balance: string;
  account_name: string;
  mask: string;
  type: string;
}

interface HomeAsideProps {
  banks: BankInfo[];
}

interface BankCardStackProps {
  banks: BankInfo[];
}

interface IExchangePublicToken {
  publicToken: string;
  user: IUser;
}

interface IAddFundingSource {
  dwollaCustomerId: string;
  processorToken: string;
  bankName: string;
}

interface IFundingSourceOptions {
  customerId: string;
  fundingSourceName: string;
  plaidToken: string;
  _links: string;
}

type AuthType = "login" | "register";
