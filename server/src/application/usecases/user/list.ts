export default function makeListUsersUseCase({
  repository,
}: IMakeUseCase<IUserRepository>): () => Promise<IUser[]> {
  return async function listUsers() {
    const result = await repository.findAll();

    return result;
  };
}
