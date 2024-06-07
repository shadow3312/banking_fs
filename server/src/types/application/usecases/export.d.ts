import { IJWTProvider } from "@/types/infrastucture/providers/jwt";

interface IMakeAuthenticateUseCase {
  userRepository: IAuthRepository;
  passwordProvider: IPasswordProvider;
  jwtProvider: IJWTProvider;
}

interface IAuthenticateUser {
  email: string;
  password: string;
}
