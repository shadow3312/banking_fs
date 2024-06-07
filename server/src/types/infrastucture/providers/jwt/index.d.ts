interface IJwtPayload {
  id: string;
  firstName: string;
  iat?: number;
  exp?: number;
}

interface IJWTProvider {
  generateToken: (payload: Partial<IUser>) => string;
  verifyToken: (token: string) => string | IJwtPayload;
}
