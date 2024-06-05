import transactionRepository from "@/infrastructure/data/repositories/transaction";
import makeAddTransactionUseCase from "./add";
import makeGetTransactionUseCase from "./get";
import makeListTransactionsUseCase from "./list";
import makeEditTransactionUseCase from "./edit";
import makeRemoveTransactionUseCase from "./remove";
import transactionToObject from "@/application/mappers/transaction";

const addTransaction = makeAddTransactionUseCase({
  repository: transactionRepository,
  toObject: transactionToObject,
});

const editTransaction = makeEditTransactionUseCase({
  repository: transactionRepository,
  toObject: transactionToObject,
});

const getTransaction = makeGetTransactionUseCase({
  repository: transactionRepository,
});

const listTransactions = makeListTransactionsUseCase({
  repository: transactionRepository,
});

const removeTransaction = makeRemoveTransactionUseCase({
  repository: transactionRepository,
});

const transactionUseCases = Object.freeze({
  addTransaction,
  listTransactions,
  getTransaction,
  editTransaction,
  removeTransaction,
});

export {
  addTransaction,
  getTransaction,
  listTransactions,
  editTransaction,
  removeTransaction,
};

export default transactionUseCases;
