export default function makeGetBanksByAccountUseCase({
  repository,
}: IMakeUseCase<IBankRepository>): (accountId: string) => Promise<IBank> {
  return async function getBanksByAccount(accountId: string) {
    const result = await repository.findByAccountId(accountId);

    return result;
  };
}
