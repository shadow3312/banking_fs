import { User } from "@/infrastructure/data/models/user/user.model";
import { Sequelize } from "sequelize";

export interface IMakeUserRepository {
  models: IModels;
  userToObject: (user: IMakeUserMethods) => IUser;
}

interface IModels {
  User: typeof User;
}
