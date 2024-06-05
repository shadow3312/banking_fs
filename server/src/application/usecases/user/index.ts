import userRepository from "@/infrastructure/data/repositories/user";
import userToObject from "@/application/mappers/user";
import makeAddUserUseCase from "./add";
import makeGetUserUseCase from "./get";
import makeListUsersUseCase from "./list";
import makeEditUserUseCase from "./edit";
import makeRemoveUserUseCase from "./remove";

const addUser = makeAddUserUseCase({
  repository: userRepository,
  toObject: userToObject,
});

const editUser = makeEditUserUseCase({
  repository: userRepository,
  toObject: userToObject,
});

const getUser = makeGetUserUseCase({
  repository: userRepository,
});

const listUsers = makeListUsersUseCase({
  repository: userRepository,
});

const removeUser = makeRemoveUserUseCase({
  repository: userRepository,
});

const userUseCases = Object.freeze({
  addUser,
  listUsers,
  getUser,
  editUser,
  removeUser,
});

export { addUser, getUser, listUsers, editUser, removeUser };

export default userUseCases;
