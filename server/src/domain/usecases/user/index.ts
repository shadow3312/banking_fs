import userRepository from "@/infrastructure/data/repositories/user";
import userToObject from "@/shared/utils/user";
import makeUserUsecase from "./user";

const userService = makeUserUsecase({
  repository: userRepository,
  toObject: userToObject,
});

export default userService;
