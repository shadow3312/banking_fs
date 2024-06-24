const cleanUserObject: Partial<IUser> = {
  firstName: "John",
  lastName: "Doe",
  city: "New York",
  email: "email@gmail.com",
  dwollaCustomerId: "c43ndnjuwi3nndb",
  dwollaCustomerUrl: "random-url",
};
const userObject: IUser = {
  id: "wj3ojndioo0ejkl",
  firstName: "John",
  lastName: "Doe",
  address1: "address1",
  dateOfBirth: "2023-02-12",
  password: "123456",
  postalCode: "3242",
  ssn: "124",
  city: "New York",
  state: "CA",
  email: "email@gmail.com",
  dwollaCustomerId: "c43ndnjuwi3nndb",
  dwollaCustomerUrl: "random-url",
};
const userObject2: IUser = {
  id: "zk2ojndbfho0epsk",
  firstName: "Mack",
  lastName: "Jeff",
  city: "London",
  address1: "address2",
  dateOfBirth: "1992-08-204",
  password: "123456",
  postalCode: "3942",
  ssn: "123",
  state: "NY",
  email: "email@gmail.com",
  dwollaCustomerId: "c43ndnjuwi3nndb",
  dwollaCustomerUrl: "random-url",
};

const transactionObject: ITransaction = {
  id: "wj3ojndioo0ejkl",
  name: "John",
  email: "email@gmail.com",
  channel: "Online",
  amount: "50",
  category: "Transfer",
  senderId: "c43ndnjuwi3nndb",
  receiverId: "d54ndnjuwi3sjjkd",
  senderBankId: "dir23ndnjuwi3niew",
  receiverBankId: "d54ndnijdone",
};

const cleanTransactionObject: Partial<ITransaction> = {
  name: "John",
  email: "email@gmail.com",
  channel: "Online",
  amount: "50",
  category: "Transfer",
  senderId: "c43ndnjuwi3nndb",
  receiverId: "d54ndnjuwi3sjjkd",
  senderBankId: "dir23ndnjuwi3niew",
  receiverBankId: "d54ndnijdone",
};

const transactionObject2: ITransaction = {
  id: "jsi2oodj203kie9",
  name: "Jack",
  email: "email@gmail.com",
  channel: "Online",
  amount: "50",
  category: "Debit",
  senderId: "c43ndnjuwi3nndb",
  receiverId: "d54ndnjuwi3sjjkd",
  senderBankId: "dir23ndnjuwi3niew",
  receiverBankId: "d54ndnijdone",
};

const bankObject: IBank = {
  id: "ahgs67s87sshds",
  accessToken: "dnksodnvkonow3nw",
  fundingSourceUrl: "http://source.url",
  accountId: "wqojfwiqff",
  publicId: "sio32n3202d42n",
  userId: "ruri3ofn0ei49",
};
const bankObject2: IBank = {
  id: "a7aw6uwugiasb8",
  accessToken: "nwin32oinefnff",
  fundingSourceUrl: "http://source.url",
  accountId: "nw2930jfndn",
  publicId: "oerjgep3lewn",
  userId: "n3ognlwn33okm",
};

const cleanBankObject: Partial<IBank> = {
  accessToken: "dnksodnvkonow3nw",
  fundingSourceUrl: "http://source.url",
  accountId: "wqojfwiqff",
  publicId: "sio32n3202d42n",
  userId: "ruri3ofn0ei49",
};

export {
  userObject,
  userObject2,
  cleanUserObject,
  transactionObject,
  transactionObject2,
  cleanTransactionObject,
  bankObject,
  bankObject2,
  cleanBankObject,
};
