import makeAuthenticateUserUseCase from "./authenticate";
import userRepository from "@/infrastructure/data/repositories/user";
import JWTProvider from "@/infrastructure/providers/jwt";
import PasswordProvider from "@/infrastructure/providers/passwordHasher";

const jwtProvider = JWTProvider();
const passwordProvider = PasswordProvider();

const authenticateUser = makeAuthenticateUserUseCase({
  passwordProvider,
  userRepository,
  jwtProvider,
});

export default authenticateUser;
