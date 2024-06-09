import { Optional, DataTypes, Model, Sequelize } from "sequelize";
import { Table } from "sequelize-typescript";

interface UserCreationAttributes extends Optional<IUser, "id"> {}

export class User
  extends Model<IUser, UserCreationAttributes>
  implements IUser
{
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare address1: string;
  declare dateOfBirth: string;
  declare state: string;
  declare ssn: string;
  declare postalCode: string;
  declare password: string;
  declare city: string;
  declare dwollaCustomerId: string;
  declare dwollaCustomerUrl: string;
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
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateOfBirth: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      ssn: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      postalCode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      address1: {
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
