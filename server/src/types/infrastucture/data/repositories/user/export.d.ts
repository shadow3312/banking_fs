import { User } from "@/infrastructure/data/models/user/user.model";
import { Sequelize } from "sequelize";

interface IMakeUserRepository {
  models: IModels;
}

interface IModels {
  User: typeof User;
}
