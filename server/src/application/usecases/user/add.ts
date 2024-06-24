import makeUser from "@/domain/entities/user";
import { AppError } from "@/shared/errors/appError";

export default function makeAddUserUseCase({
  repository,
  toObject,
  passwordProvider,
}: IMakeObjectUserUseCase): (userData: Partial<IUser>) => Promise<IUser> {
  return async function addUser(userData: Partial<IUser>) {
    const user = makeUser(userData);
    const idExists = await repository.findById(user.getId());
    const emailExists = await repository.findByEmail(user.getEmail());

    if (idExists) {
      throw new AppError("DUPLICATE_RESOURCE");
    }

    if (emailExists) {
      throw new AppError("EMAIL_EXISTS");
    }

    if (passwordProvider) {
      const passwordHash = await passwordProvider.hash(user.getPassword());

      user.setPasswordHash(passwordHash);
    }

    const userObj = toObject(user);
    const result = await repository.create(userObj);
    return result;
  };
}
