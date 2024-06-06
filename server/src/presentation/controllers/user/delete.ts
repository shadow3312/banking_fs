import {
  catchError,
  setJsonError,
  setJsonReponse,
} from "@/presentation/helpers";
import { AppError } from "@/types/application/errors";
import { IHttpError } from "@/types/presentation/adapters";
import {
  IMakeDeleteUserController,
  IUserRequest,
  IUserResponse,
} from "@/types/presentation/controllers/user";

export default function makeDeleteUser({
  removeUser,
}: IMakeDeleteUserController) {
  return async function deleteUser(httpRequest: IUserRequest): Promise<{}> {
    try {
      const { id } = httpRequest.params;
      const deleted = await removeUser(id);

      return setJsonReponse<{}>({ statusCode: 202, body: {} });
    } catch (error) {
      return catchError(error);
    }
  };
}
