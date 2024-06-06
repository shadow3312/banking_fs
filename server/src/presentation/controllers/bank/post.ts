import { catchError, setJsonReponse } from "@/presentation/helpers";
import {
  IMakePostBankController,
  IBankRequest,
  IBankResponse,
} from "@/types/presentation/controllers/bank";

export default function makePostBank({ addBank }: IMakePostBankController) {
  return async function postBank(
    httpRequest: IBankRequest
  ): Promise<IBankResponse> {
    try {
      const { body } = httpRequest;
      const bank = await addBank(body);
      return setJsonReponse({ statusCode: 200, body: bank });
    } catch (error) {
      return catchError(error);
    }
  };
}
