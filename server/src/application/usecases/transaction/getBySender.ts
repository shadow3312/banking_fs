export default function makeGetTransactionsBySenderUseCase({
  repository,
}: IMakeUseCase<ITransactionRepository>): (
  senderBankId: string
) => Promise<ITransaction[]> {
  return async function getTransactionsBySender(senderBankId: string) {
    const result = await repository.findBySenderBankId(senderBankId);

    return result;
  };
}
