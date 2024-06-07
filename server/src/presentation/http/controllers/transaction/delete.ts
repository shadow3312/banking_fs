import { catchError, setJsonReponse } from "@/presentation/http/helpers";
import {
  IMakeDeleteTransactionController,
  ITransactionRequest,
} from "@/types/presentation/controllers/transaction";

export default function makeDeleteTransaction({
  removeTransaction,
}: IMakeDeleteTransactionController) {
  return async function deleteTransaction(
    httpRequest: ITransactionRequest
  ): Promise<{}> {
    try {
      const { id } = httpRequest.params;
      await removeTransaction(id);

      return setJsonReponse<{}>({ statusCode: 202, body: {} });
    } catch (error) {
      return catchError(error);
    }
  };
}
