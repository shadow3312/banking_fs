export default function makeGetBanksByUserUseCase({
  repository,
}: IMakeUseCase<IBankRepository>): (id: string) => Promise<IBank[]> {
  return async function getBanksByUser(userId: string) {
    const result = await repository.findByUserId(userId);

    return result;
  };
}
