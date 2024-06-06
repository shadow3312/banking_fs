import { AppError } from "@/shared/errors/appError";

export default function makeGetUserUseCase({
  repository,
}: IMakeUseCase<IUserRepository>): (id: string) => Promise<IUser> {
  return async function getUser(id: string) {
    const result = await repository.findById(id);

    if (!result) {
      throw new AppError("NOT_FOUND");
    }

    return result;
  };
}
