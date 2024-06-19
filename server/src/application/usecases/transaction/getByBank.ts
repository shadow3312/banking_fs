export default function makeGetTransactionsByBankUseCase({
  repository,
}: IMakeUseCase<ITransactionRepository>): (
  bankId: string
) => Promise<ITransaction[]> {
  return async function getTransactionsByBank(bankId: string) {
    const result = await repository.findByBankId(bankId);

    return result;
  };
}
