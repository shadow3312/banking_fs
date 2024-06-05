import makeUser from "@/domain/entities/user";

export default function makeEditUserUseCase({
  repository,
  toObject,
}: IMakeObjectUserUseCase): (
  id: string,
  userData: Partial<IUser>
) => Promise<IUser> {
  return async function editUser(id: string, data: Partial<IUser>) {
    if (!id) {
      throw new Error("You must supply an id");
    }
    const existing = await repository.findById(id);

    if (!existing) {
      throw new RangeError("User not found");
    }

    const newData = { ...existing, ...data };

    const user = makeUser(newData);

    const userObj = toObject(user);
    const updated = await repository.update(id, userObj);

    return updated;
  };
}
