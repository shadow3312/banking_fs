import {
  listTransactions,
  getTransaction,
  addTransaction,
  editTransaction,
  removeTransaction,
} from "@/application/usecases/transaction";

import makeGetAllTransactions from "./getAll";
import makeGetSingleTransaction from "./getById";
import makePostTransaction from "./post";
import makePatchTransaction from "./patch";
import makeDeleteTransaction from "./delete";

const getAllTransactions = makeGetAllTransactions({ listTransactions });
const getSingleTransaction = makeGetSingleTransaction({ getTransaction });
const postTransaction = makePostTransaction({ addTransaction });
const patchTransaction = makePatchTransaction({ editTransaction });
const deleteTransaction = makeDeleteTransaction({ removeTransaction });

const transactionController = Object.freeze({
  getAllTransactions,
  getSingleTransaction,
  postTransaction,
  patchTransaction,
  deleteTransaction,
});

export {
  getAllTransactions,
  getSingleTransaction,
  postTransaction,
  patchTransaction,
  deleteTransaction,
};

export default transactionController;
