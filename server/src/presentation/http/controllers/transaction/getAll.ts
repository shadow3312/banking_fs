import { catchError, setJsonReponse } from "@/presentation/http/helpers";
import {
  IMakeGetAllTransactionsController,
  ITransactionRequest,
  ITransactionListResponse,
} from "@/types/presentation/controllers/transaction";

export default function makeGetAllTransactions({
  listTransactions,
}: IMakeGetAllTransactionsController) {
  return async function getAllTransactions(
    httpRequest: ITransactionRequest
  ): Promise<ITransactionListResponse> {
    try {
      const transactions = await listTransactions();
      return setJsonReponse({ statusCode: 200, body: transactions });
    } catch (error) {
      return catchError(error);
    }
  };
}
