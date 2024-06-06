import { catchError, setJsonReponse } from "@/presentation/helpers";
import {
  IMakeGetSingleBankController,
  IBankRequest,
  IBankResponse,
} from "@/types/presentation/controllers/bank";

export default function makeGetSingleBank({
  getBank,
}: IMakeGetSingleBankController) {
  return async function getSingleBank(
    httpRequest: IBankRequest
  ): Promise<IBankResponse> {
    try {
      const { id } = httpRequest.params;
      const bank = await getBank(id);
      return setJsonReponse({ statusCode: 200, body: bank });
    } catch (error) {
      return catchError(error);
    }
  };
}
