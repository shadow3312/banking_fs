import {
  listUsers,
  getUser,
  addUser,
  editUser,
  removeUser,
} from "@/application/usecases/user";

import makeGetAllUsers from "./getAll";
import makeGetSingleUser from "./getById";
import makePostUser from "./post";
import makePatchUser from "./patch";
import makeDeleteUser from "./delete";

const getAllUsers = makeGetAllUsers({ listUsers });
const getSingleUser = makeGetSingleUser({ getUser });
const postUser = makePostUser({ addUser });
const patchUser = makePatchUser({ editUser });
const deleteUser = makeDeleteUser({ removeUser });

const userController = Object.freeze({
  getAllUsers,
  getSingleUser,
  postUser,
  patchUser,
  deleteUser,
});

export { getAllUsers, getSingleUser, postUser, patchUser, deleteUser };

export default userController;
