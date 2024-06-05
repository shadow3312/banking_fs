export default function makeGetTransactionUseCase({
  repository,
}: IMakeUseCase<ITransactionRepository>): (
  id: string
) => Promise<ITransaction> {
  return async function getTransaction(id: string) {
    const result = await repository.findById(id);

    return result;
  };
}
