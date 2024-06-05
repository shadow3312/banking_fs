export default function makeListTransactionsUseCase({
  repository,
}: IMakeUseCase<ITransactionRepository>): () => Promise<ITransaction[]> {
  return async function listTransactions() {
    const result = await repository.findAll();

    return result;
  };
}
