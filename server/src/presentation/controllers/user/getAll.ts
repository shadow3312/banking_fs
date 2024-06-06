import { catchError, setJsonReponse } from "@/presentation/helpers";
import {
  IMakeGetAllUsersController,
  IUserRequest,
  IUserListResponse,
} from "@/types/presentation/controllers/user";

export default function makeGetAllUsers({
  listUsers,
}: IMakeGetAllUsersController) {
  return async function getAllUsers(
    httpRequest: IUserRequest
  ): Promise<IUserListResponse> {
    try {
      const users = await listUsers();
      return setJsonReponse({ statusCode: 200, body: users });
    } catch (error) {
      return catchError(error);
    }
  };
}
