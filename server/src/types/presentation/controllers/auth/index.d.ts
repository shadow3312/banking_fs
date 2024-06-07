interface ILoginReturn {
  user: IUser;
  token: string;
}

interface IMakeLoginController {
  authenticateUser: (email: string, password: string) => Promise<ILoginReturn>;
}
