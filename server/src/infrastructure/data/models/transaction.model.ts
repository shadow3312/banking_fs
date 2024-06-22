import { Optional, DataTypes, Model, Sequelize } from "sequelize";
import { Table } from "sequelize-typescript";

interface TransactionCreationAttributes extends Optional<ITransaction, "id"> {}

export class Transaction
  extends Model<ITransaction, TransactionCreationAttributes>
  implements ITransaction
{
  declare id: string;
  declare name: string;
  declare email: string;
  declare amount: string;
  declare category: string;
  declare channel: string;
  declare senderId: string;
  declare receiverId: string;
  declare senderBankId: string;
  declare receiverBankId: string;
  declare createdAt: string;
}

export function initializeTransaction(
  sequelize: Sequelize
): typeof Transaction {
  Transaction.init(
    {
      id: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      amount: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      channel: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      senderId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      receiverId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      senderBankId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      receiverBankId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATEONLY,
        defaultValue: Sequelize.fn("NOW"),
      },
    },
    {
      sequelize,
      tableName: "transactions",
      timestamps: false,
    }
  );

  return Transaction;
}
