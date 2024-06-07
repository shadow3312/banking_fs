import { AppError } from "@/shared/errors/appError";
import {
  IAuthenticateUser,
  IMakeAuthenticateUseCase,
} from "@/types/application/usecases/export";

export default function makeAuthenticateUserUseCase({
  passwordProvider,
  userRepository,
  jwtProvider,
}: IMakeAuthenticateUseCase) {
  return async function authenticateUser(
    email: string,
    password: string
  ): Promise<ILoginReturn> {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError("AUTH_INVALID_CREDENTIALS");
    }

    const passwordMatch = await passwordProvider.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      throw new AppError("AUTH_INVALID_CREDENTIALS");
    }

    const token = jwtProvider.generateToken({
      id: user.id,
      firstName: user.firstName,
    });

    return { user, token };
  };
}
