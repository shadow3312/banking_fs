import makeTransaction from "@/domain/entities/transaction";

export default function makeAddTransactionUseCase({
  repository,
  toObject,
}: IMakeObjectTransactionUseCase): (
  transactionData: Partial<ITransaction>
) => Promise<ITransaction> {
  return async function addTransaction(transactionData: Partial<ITransaction>) {
    const transaction = makeTransaction(transactionData);
    const exists = await repository.findById(transaction.getId());

    if (exists) {
      throw new Error(`Duplicate transaction id`);
    }

    const transactionObj = toObject(transaction);
    const result = await repository.create(transactionObj);
    return result;
  };
}
