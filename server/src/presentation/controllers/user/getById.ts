import { catchError, setJsonReponse } from "@/presentation/helpers";
import {
  IMakeGetSingleUserController,
  IUserRequest,
  IUserResponse,
} from "@/types/presentation/controllers/user";

export default function makeGetSingleUser({
  getUser,
}: IMakeGetSingleUserController) {
  return async function getSingleUser(
    httpRequest: IUserRequest
  ): Promise<IUserResponse> {
    try {
      const { id } = httpRequest.params;
      const user = await getUser(id);
      return setJsonReponse({ statusCode: 200, body: user });
    } catch (error) {
      return catchError(error);
    }
  };
}
