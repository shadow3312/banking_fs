interface IUserRepository {
  findAll: () => Promise<[]>;
  findById: (id: string) => Promise<{}>;
  adaptUser: (user: IMakeUserMethods) => Promise<{}>;
  create: (modelObj: any) => Promise<{}>;
}
