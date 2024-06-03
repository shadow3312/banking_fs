import {
  IBuildMakeRepository,
  IMakeRepository,
  IModels,
} from "@/types/infrastucture/data/repositories/export";

export default function buildMakeRepository({ models }: IBuildMakeRepository) {
  return function makeRepository<T>({
    verboseName,
    model,
  }: IMakeRepository): IRepository<T> {
    async function findAll() {
      try {
        const instances = await model.findAll();
        const data = instances.map((instance: any) => instance.toJSON());
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

    async function create(data: T) {
      try {
        const instance = await model.create(data);

        return instance.toJSON();
      } catch (error) {
        throw new Error(`Failed to create ${verboseName}`);
      }
    }

    async function update(id: string, data: Partial<T>) {
      try {
        const instance = await model.findByPk(id);
        if (!instance) {
          throw new Error(`${verboseName} not found`);
        }
        await instance.update(data);
        return instance.toJSON();
      } catch (error) {
        throw new Error(`Failed to edit ${verboseName}`);
      }
    }

    async function remove(id: string) {
      try {
        const instance = await model.findByPk(id);
        if (!instance) {
          throw new Error(`${verboseName} not found`);
        }
        await instance.destroy();
      } catch (error) {
        throw new Error(`Failed to remove ${verboseName}`);
      }
    }

    return Object.freeze({
      findAll,
      findById,
      create,
      update,
      remove,
    });
  };
}
