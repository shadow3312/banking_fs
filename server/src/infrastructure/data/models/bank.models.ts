import { Optional, DataTypes, Model, Sequelize } from "sequelize";

interface BankCreationAttributes extends Optional<IBank, "id"> {}

export class Bank
  extends Model<IBank, BankCreationAttributes>
  implements IBank
{
  declare id: string;
  declare accessToken: string;
  declare fundingSourceUrl: string;
  declare accountId: string;
  declare publicId: string;
  declare userId: string;
}

export function initializeBank(sequelize: Sequelize): typeof Bank {
  Bank.init(
    {
      id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      fundingSourceUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accountId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      publicId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "banks",
      timestamps: false,
    }
  );

  return Bank;
}
