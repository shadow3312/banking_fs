interface IMakeObjectUseCase<R, M, T> {
  repository: R;
  toObject: (methods: M) => T;
  passwordProvider?: IPasswordProvider;
}

interface IMakeUseCase<T> {
  repository: T;
}

type IMakeObjectUserUseCase = IMakeObjectUseCase<
  IUserRepository,
  IMakeUserMethods,
  IUser
>;

type IMakeObjectTransactionUseCase = IMakeObjectUseCase<
  ITransactionRepository,
  IMakeTransactionMethods,
  ITransaction
>;

type IMakeObjectBankUseCase = IMakeObjectUseCase<
  IBankRepository,
  IMakeBankMethods,
  IBank
>;

type IMakeBankUsecase = IMakeUsecase<IBankRepository, IMakeBankMethods, IBank>;
