import { catchError, setJsonReponse } from "@/presentation/helpers";
import {
  IMakePostTransactionController,
  ITransactionRequest,
  ITransactionResponse,
} from "@/types/presentation/controllers/transaction";

export default function makePostTransaction({
  addTransaction,
}: IMakePostTransactionController) {
  return async function postTransaction(
    httpRequest: ITransactionRequest
  ): Promise<ITransactionResponse> {
    try {
      const { body } = httpRequest;
      const transaction = await addTransaction(body);
      return setJsonReponse({ statusCode: 200, body: transaction });
    } catch (error) {
      return catchError(error);
    }
  };
}
