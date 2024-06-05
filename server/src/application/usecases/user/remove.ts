export default function makeRemoveUserUseCase({
  repository,
}: IMakeUseCase<IUserRepository>): (id: string) => Promise<void> {
  return async function removeUser(id: string) {
    if (!id) {
      throw new Error("You must provide an id");
    }
    const existing = await repository.findById(id);
    if (!existing) {
      throw new Error(`User not found`);
    }

    await repository.remove(id);
  };
}
