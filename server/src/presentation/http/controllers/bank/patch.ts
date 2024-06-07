import { catchError, setJsonReponse } from "@/presentation/http/helpers";
import {
  IMakePatchBankController,
  IBankRequest,
  IBankResponse,
} from "@/types/presentation/controllers/bank";

export default function makePatchBank({ editBank }: IMakePatchBankController) {
  return async function pathBank(
    httpRequest: IBankRequest
  ): Promise<IBankResponse> {
    try {
      const { id } = httpRequest.params;
      const { body } = httpRequest;
      const banks = await editBank(id, body);
      return setJsonReponse({ statusCode: 200, body: banks });
    } catch (error) {
      return catchError(error);
    }
  };
}
