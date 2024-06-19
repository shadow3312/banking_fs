export default function makeGetTransactionsByReceiverUseCase({
  repository,
}: IMakeUseCase<ITransactionRepository>): (
  receiverBankId: string
) => Promise<ITransaction[]> {
  return async function getTransactionsByReceiver(receiverBankId: string) {
    const result = await repository.findByReceiverBankId(receiverBankId);

    return result;
  };
}
