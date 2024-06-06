import { catchError, setJsonReponse } from "@/presentation/helpers";
import {
  IMakeGetAllBanksController,
  IBankRequest,
  IBankListResponse,
} from "@/types/presentation/controllers/bank";

export default function makeGetAllBanks({
  listBanks,
}: IMakeGetAllBanksController) {
  return async function getAllBanks(
    httpRequest: IBankRequest
  ): Promise<IBankListResponse> {
    try {
      const banks = await listBanks();
      return setJsonReponse({ statusCode: 200, body: banks });
    } catch (error) {
      return catchError(error);
    }
  };
}
