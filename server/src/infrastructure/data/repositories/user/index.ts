import makeUserRepository from "./user";
import { models } from "../../config";
import userToObject from "../../adapters/user";

const userRepository = makeUserRepository({ models, userToObject });

export default userRepository;
