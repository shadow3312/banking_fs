import { AppError } from "@/shared/errors/appError";

export default function makeGetUserByEmailUseCase({
  repository,
}: IMakeUseCase<IUserRepository>): (id: string) => Promise<IUser> {
  return async function getUserByEmail(email: string) {
    const result = await repository.findByEmail(email);

    if (!result) {
      throw new AppError("NOT_FOUND");
    }

    return result;
  };
}
