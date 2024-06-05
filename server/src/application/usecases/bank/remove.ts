export default function makeRemoveBankUseCase({
  repository,
}: IMakeUseCase<IBankRepository>): (id: string) => Promise<void> {
  return async function removeBank(id: string) {
    if (!id) {
      throw new Error("You must provide an id");
    }
    const existing = await repository.findById(id);
    if (!existing) {
      throw new Error(`Bank not found`);
    }

    await repository.remove(id);
  };
}
