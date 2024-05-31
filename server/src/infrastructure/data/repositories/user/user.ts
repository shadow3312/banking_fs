import { IMakeUserRepository } from "@/types/infrastucture/data/repositories/user/export";

export default function makeUserRepository({
  models,
}: IMakeUserRepository): IUserRepository {
  return Object.freeze({
    findAll,
  });

  async function findAll() {
    try {
      const model = models.User;

      const instances = await model.findAll();
      const data = instances.map((instance) => instance.toJSON());
      return data;
    } catch (error) {
      throw new Error(`Failed to find all users`);
    }
  }
}
