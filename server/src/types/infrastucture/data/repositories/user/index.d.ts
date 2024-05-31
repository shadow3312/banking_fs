interface IUserRepository {
  findAll: () => Promise<IUser[]>;
  // findById: (id: string) => Promise<{}>;
  // adaptUser: (user: IMakeUserMethods) => Promise<{}>;
  // create: (modelObj: any) => Promise<{}>;
}
