import { catchError, setJsonReponse } from "@/presentation/http/helpers";
import {
  IMakePatchTransactionController,
  ITransactionRequest,
  ITransactionResponse,
} from "@/types/presentation/controllers/transaction";

export default function makePatchTransaction({
  editTransaction,
}: IMakePatchTransactionController) {
  return async function pathTransaction(
    httpRequest: ITransactionRequest
  ): Promise<ITransactionResponse> {
    try {
      const { id } = httpRequest.params;
      const { body } = httpRequest;
      const transactions = await editTransaction(id, body);
      return setJsonReponse({ statusCode: 200, body: transactions });
    } catch (error) {
      return catchError(error);
    }
  };
}
