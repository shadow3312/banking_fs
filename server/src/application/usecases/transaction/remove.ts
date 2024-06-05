export default function makeRemoveTransactionUseCase({
  repository,
}: IMakeUseCase<ITransactionRepository>): (id: string) => Promise<void> {
  return async function removeTransaction(id: string) {
    if (!id) {
      throw new Error("You must provide an id");
    }
    const existing = await repository.findById(id);
    if (!existing) {
      throw new Error(`Transaction not found`);
    }

    await repository.remove(id);
  };
}
