import { IMakeUserRepository } from "@/types/infrastucture/data/repositories/user/export";

export default function makeUserRepository({
  models,
  userToObject,
}: IMakeUserRepository): IUserRepository {
  const model = models.User;
  const verboseName = "user";

  return Object.freeze({
    adaptUser,
    findAll,
    findById,
    create,
  });

  function adaptUser(user: IMakeUserMethods) {
    const obj = userToObject(user);
  }

  async function findAll() {
    try {
      const instances = await model.findAll();
      const data = instances.map((instance) => instance.toJSON());
      return data;
    } catch (error) {
      throw new Error(`Failed to find all users`);
    }
  }

  async function findById(id: string) {
    try {
      const instance = await model.findByPk(id);

      if (!instance) {
        throw new Error(`${verboseName} not found`);
      }

      return instance?.toJSON();
    } catch (error) {
      throw new Error(`Failed to find ${verboseName} by ID`);
    }
  }

  async function create(data: IUser) {
    try {
      const instance = await model.create(data);

      return instance.toJSON();
    } catch (error) {
      throw new Error(`Failed to create ${verboseName}`);
    }
  }
}
