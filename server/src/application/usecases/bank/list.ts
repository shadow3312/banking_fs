export default function makeListBanksUseCase({
  repository,
}: IMakeUseCase<IBankRepository>): () => Promise<IBank[]> {
  return async function listBanks() {
    const result = await repository.findAll();

    return result;
  };
}
