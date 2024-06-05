import makeTransaction from "@/domain/entities/transaction";

export default function makeEditTransactionUseCase({
  repository,
  toObject,
}: IMakeObjectTransactionUseCase): (
  id: string,
  transactionData: Partial<ITransaction>
) => Promise<ITransaction> {
  return async function editTransaction(
    id: string,
    data: Partial<ITransaction>
  ) {
    if (!id) {
      throw new Error("You must supply an id");
    }
    const existing = await repository.findById(id);

    if (!existing) {
      throw new RangeError("Transaction not found");
    }

    const newData = { ...existing, ...data };

    const transaction = makeTransaction(newData);

    const transactionObj = toObject(transaction);
    const updated = await repository.update(id, transactionObj);

    return updated;
  };
}
