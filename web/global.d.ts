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

type AuthType = "login" | "register";
