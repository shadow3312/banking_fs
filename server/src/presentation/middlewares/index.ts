import { makeAuthMiddleware } from "./auth";
import userRepository from "@/infrastructure/data/repositories/user";

const isAuthenticated = makeAuthMiddleware({ userRepository });

export default isAuthenticated;
