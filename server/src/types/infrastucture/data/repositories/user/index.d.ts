interface IUserRepository {
  // adaptUser: (user: IMakeUserMethods) => any;
  findAll: () => Promise<IUser[]>;
  findById: (id: string) => Promise<IUser>;
  create: (data: IUser) => Promise<IUser>;
}
