import { Bank } from "@/infrastructure/data/models/bank.models";
import { Transaction } from "@/infrastructure/data/models/transaction.model";
import { User } from "@/infrastructure/data/models/user.model";
import { Sequelize } from "sequelize";

export interface IMakeRepository {
  verboseName: string;
  model: any;
}

export interface IBuildMakeRepository {
  models: IModels;
}

export interface IModels {
  User: typeof User;
  Transaction: typeof Transaction;
  Bank: typeof Bank;
}
