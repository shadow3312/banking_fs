import makeUser from "@/domain/entities/user";

export default function makeAddUser({ userRepository }: IMakeAddUser) {
  return async function addUser(userData: IUser) {
    const user = makeUser(userData);
    const exists = await userRepository.findById(userData.id);

    if (exists) {
      throw new Error(`Duplicate user id`);
    }

    const modelObj = await userRepository.adaptUser(user);
    const result = await userRepository.create(modelObj);
  };
}
