import {
  IHttpError,
  IHttpRequest,
  IHttpResponse,
  IJsonResponse,
} from "../../adapters";

interface IMakeGetAllTransactionsController {
  listTransactions: () => Promise<ITransaction[]>;
}

interface IMakePostTransactionController {
  addTransaction: (
    transactionData: Partial<ITransaction>
  ) => Promise<ITransaction>;
}

interface IMakeGetSingleTransactionController {
  getTransaction: (id: string) => Promise<ITransaction>;
}

interface IMakePatchTransactionController {
  editTransaction: (
    id: string,
    transactionData: Partial<ITransaction>
  ) => Promise<ITransaction>;
}

interface IMakeDeleteTransactionController {
  removeTransaction: (id: string) => Promise<void>;
}

interface ITransactionRequest extends IHttpRequest {}

type ITransactionResponse = IHttpResponse | IHttpError;
type ITransactionListResponse = IHttpResponse | IHttpError;
