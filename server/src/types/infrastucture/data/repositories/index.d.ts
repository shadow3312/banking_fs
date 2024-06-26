interface IRepository<T> {
  findAll: () => Promise<T[]>;
  findById: (id: string) => Promise<T>;
  findByEmail: (email: string) => Promise<T>;
  findByBankId: (bankId: string) => Promise<T[]>;
  findBySenderBankId: (senderBankId: string) => Promise<T[]>;
  findByReceiverBankId: (receiverBankId: string) => Promise<T[]>;
  findByUserId: (userId: string) => Promise<T[]>;
  findByAccountId: (accountId: string) => Promise<T>;
  create: (data: T) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  remove: (id: string) => Promise<void>;
}

interface IAuth<T> {
  findByEmail: (email: string) => Promise<T>;
}

type IUserRepository = IRepository<IUser>;
type ITransactionRepository = IRepository<ITransaction>;
type IBankRepository = IRepository<IBank>;

type IAuthRepository = IUserRepository & IAuth<IUser>;
