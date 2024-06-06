import { AppError } from "@/errors/appError";

export default function makeRemoveUserUseCase({
  repository,
}: IMakeUseCase<IUserRepository>): (id: string) => Promise<void> {
  return async function removeUser(id: string) {
    if (!id) {
      throw new AppError("VALIDATION_ERROR", "You must provide an id");
    }
    const existing = await repository.findById(id);
    if (!existing) {
      throw new AppError("NOT_FOUND");
    }

    await repository.remove(id);
  };
}
