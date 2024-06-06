import { catchError, setJsonReponse } from "@/presentation/helpers";
import {
  IMakePatchUserController,
  IUserRequest,
  IUserResponse,
} from "@/types/presentation/controllers/user";

export default function makePatchUser({ editUser }: IMakePatchUserController) {
  return async function pathUser(
    httpRequest: IUserRequest
  ): Promise<IUserResponse> {
    try {
      const { id } = httpRequest.params;
      const { body } = httpRequest;
      const users = await editUser(id, body);
      return setJsonReponse({ statusCode: 200, body: users });
    } catch (error) {
      return catchError(error);
    }
  };
}
