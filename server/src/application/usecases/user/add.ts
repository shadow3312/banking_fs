import makeUser from "@/domain/entities/user";

export default function makeAddUserUseCase({
  repository,
  toObject,
}: IMakeObjectUserUseCase): (userData: Partial<IUser>) => Promise<IUser> {
  return async function addUser(userData: Partial<IUser>) {
    const user = makeUser(userData);
    const exists = await repository.findById(user.getId());

    if (exists) {
      throw new Error(`Duplicate user id`);
    }

    const userObj = toObject(user);
    const result = await repository.create(userObj);
    return result;
  };
}
