import makeBank from "@/domain/entities/bank";

export default function makeEditBankUseCase({
  repository,
  toObject,
}: IMakeObjectBankUseCase): (
  id: string,
  bankData: Partial<IBank>
) => Promise<IBank> {
  return async function editBank(id: string, data: Partial<IBank>) {
    if (!id) {
      throw new Error("You must supply an id");
    }
    const existing = await repository.findById(id);

    if (!existing) {
      throw new RangeError("Bank not found");
    }

    const newData = { ...existing, ...data };

    const bank = makeBank(newData);

    const bankObj = toObject(bank);
    const updated = await repository.update(id, bankObj);

    return updated;
  };
}
