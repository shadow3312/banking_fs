import { catchError, setJsonReponse } from "@/presentation/http/helpers";
import {
  IMakeDeleteBankController,
  IBankRequest,
} from "@/types/presentation/controllers/bank";

export default function makeDeleteBank({
  removeBank,
}: IMakeDeleteBankController) {
  return async function deleteBank(httpRequest: IBankRequest): Promise<{}> {
    try {
      const { id } = httpRequest.params;
      await removeBank(id);

      return setJsonReponse<{}>({ statusCode: 202, body: {} });
    } catch (error) {
      return catchError(error);
    }
  };
}
