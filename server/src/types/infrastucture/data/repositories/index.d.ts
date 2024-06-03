interface IRepository<T> {
  findAll: () => Promise<T[]>;
  findById: (id: string) => Promise<T>;
  create: (data: T) => Promise<T>;
  update: (id: string, data: Partial<T>) => Promise<T>;
  remove: (id: string) => Promise<void>;
}

type IUserRepository = IRepository<IUser>;
type ITransactionRepository = IRepository<ITransaction>;
