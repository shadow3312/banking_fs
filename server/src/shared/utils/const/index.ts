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
  city: "New York",
  email: "email@gmail.com",
  dwollaCustomerId: "c43ndnjuwi3nndb",
  dwollaCustomerUrl: "random-url",
};
const userObject2: IUser = {
  id: "zk2ojndbfho0epsk",
  firstName: "Mack",
  lastName: "Jeff",
  city: "London",
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

export {
  userObject,
  userObject2,
  cleanUserObject,
  transactionObject,
  transactionObject2,
  cleanTransactionObject,
};
