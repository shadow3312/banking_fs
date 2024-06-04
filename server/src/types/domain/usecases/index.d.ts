interface IMakeUsecase<R, M, T> {
  repository: R;
  toObject: (methods: M) => T;
}

interface IUsecase<T> {
  add: (data: Partial<T>) => Promise<T>;
  list: () => Promise<T[]>;
  get: (id: string) => Promise<T>;
  edit: (id: string, user: Partial<T>) => Promise<T>;
  remove: (id: string) => Promise<void>;
}

type IMakeUserUsecase = IMakeUsecase<IUserRepository, IMakeUserMethods, IUser>;
type IMakeTransactionUsecase = IMakeUsecase<
  ITransactionRepository,
  IMakeTransactionMethods,
  ITransaction
>;
type IMakeBankUsecase = IMakeUsecase<IBankRepository, IMakeBankMethods, IBank>;
