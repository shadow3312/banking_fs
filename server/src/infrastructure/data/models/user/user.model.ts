import { Optional, DataTypes, Model, Sequelize } from "sequelize";
import { Table } from "sequelize-typescript";

interface UserCreationAttributes extends Optional<IUser, "id"> {}

export class User
  extends Model<IUser, UserCreationAttributes>
  implements IUser
{
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public city!: string;
  public dwollaCustomerId!: string;
  public dwollaCustomerUrl!: string;
}

export function initializeUser(sequelize: Sequelize): typeof User {
  User.init(
    {
      id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dwollaCustomerId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dwollaCustomerUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: false,
    }
  );

  return User;
}
