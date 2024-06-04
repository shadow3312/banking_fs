import makeUser from "@/domain/entities/user";

export default function makeUserUsecase({
  repository,
  toObject,
}: IMakeUserUsecase): IUsecase<IUser> {
  return Object.freeze({
    add,
    list,
    get,
    edit,
    remove,
  });

  async function list() {
    const users = await repository.findAll();

    return users;
  }

  async function add(userData: Partial<IUser>) {
    const user = makeUser(userData);
    const exists = await repository.findById(user.getId());

    if (exists) {
      throw new Error(`Duplicate user id`);
    }

    const userObj = toObject(user);
    const result = await repository.create(userObj);

    return result;
  }

  async function remove(id: string) {
    if (!id) {
      throw new Error("You must provide an id");
    }
    const existing = await repository.findById(id);
    if (!existing) {
      throw new Error(`User not found`);
    }

    await repository.remove(id);
  }

  async function edit(id: string, data: Partial<IUser>) {
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
  }

  async function get(id: string) {
    const result = await repository.findById(id);

    return result;
  }
}
