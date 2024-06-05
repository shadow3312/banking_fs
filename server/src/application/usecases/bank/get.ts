export default function makeGetBankUseCase({
  repository,
}: IMakeUseCase<IBankRepository>): (id: string) => Promise<IBank> {
  return async function getBank(id: string) {
    const result = await repository.findById(id);

    return result;
  };
}
