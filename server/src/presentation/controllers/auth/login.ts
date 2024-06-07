import { catchError, setJsonReponse } from "@/presentation/helpers";
import {
  IUserRequest,
  IUserResponse,
} from "@/types/presentation/controllers/user";

export default function makeLogin({ authenticateUser }: IMakeLoginController) {
  return async function login(
    httpRequest: IUserRequest
  ): Promise<IUserResponse> {
    try {
      const { email, password } = httpRequest.body;
      const user = await authenticateUser(email, password);
      return setJsonReponse({ statusCode: 200, body: user });
    } catch (error) {
      return catchError(error);
    }
  };
}
