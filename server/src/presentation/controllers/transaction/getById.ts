import { catchError, setJsonReponse } from "@/presentation/helpers";
import {
  IMakeGetSingleTransactionController,
  ITransactionRequest,
  ITransactionResponse,
} from "@/types/presentation/controllers/transaction";

export default function makeGetSingleTransaction({
  getTransaction,
}: IMakeGetSingleTransactionController) {
  return async function getSingleTransaction(
    httpRequest: ITransactionRequest
  ): Promise<ITransactionResponse> {
    try {
      const { id } = httpRequest.params;
      const transaction = await getTransaction(id);
      return setJsonReponse({ statusCode: 200, body: transaction });
    } catch (error) {
      return catchError(error);
    }
  };
}
