import { catchError, setJsonReponse } from "@/presentation/helpers";
import {
  IMakePostUserController,
  IUserRequest,
  IUserResponse,
} from "@/types/presentation/controllers/user";

export default function makePostUser({ addUser }: IMakePostUserController) {
  return async function postUser(
    httpRequest: IUserRequest
  ): Promise<IUserResponse> {
    try {
      const { body } = httpRequest;
      const user = await addUser(body);
      return setJsonReponse({ statusCode: 200, body: user });
    } catch (error) {
      return catchError(error);
    }
  };
}
