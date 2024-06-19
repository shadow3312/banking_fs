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
  createdAt?: number;
}

interface IBuildMakeTransaction {
  Id: IId;
  validateEmail: IValidateEmail;
}

interface IMakeTransactionMethods {
  getId: () => string;
  getName: () => string;
  getEmail: () => string;
  getAmount: () => string;
  getChannel: () => string;
  getCategory: () => string;
  getSenderId: () => string;
  getReceiverId: () => string;
  getSenderBankId: () => string;
  getReceiverBankId: () => string;
  getCreatedAt: () => number | undefined;
}
