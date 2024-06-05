interface IMakeObjectUseCase<R, M, T> {
  repository: R;
  toObject: (methods: M) => T;
}

interface IMakeUseCase<T> {
  repository: T;
}

// interface IMakeAddUserUseCase {
//   repository: IUserRepository;
//   toObject: (methods: IMakeUserMethods) => IUser;
// }

type IMakeObjectUserUseCase = IMakeObjectUseCase<
  IUserRepository,
  IMakeUserMethods,
  IUser
>;

type IMakeBankUsecase = IMakeUsecase<IBankRepository, IMakeBankMethods, IBank>;
