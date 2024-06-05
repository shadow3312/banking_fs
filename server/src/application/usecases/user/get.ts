export default function makeGetUserUseCase({
  repository,
}: IMakeUseCase<IUserRepository>): (id: string) => Promise<IUser> {
  return async function getUser(id: string) {
    const result = await repository.findById(id);

    return result;
  };
}
