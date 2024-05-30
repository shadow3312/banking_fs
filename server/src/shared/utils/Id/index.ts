import { createId, isCuid } from "@paralleldrive/cuid2";

const Id: IId = Object.freeze({
  makeId: () => {
    const id = createId();
    if (!isCuid(id)) {
      throw new Error(`Invalid ID format`);
    }
    return id;
  },
  isValidId: (id: string) => isCuid(id),
});

export default Id;
