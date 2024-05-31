import makeUserRepository from "./user";
import { models } from "../../config";

const userRepository = makeUserRepository({ models });

export default userRepository;
