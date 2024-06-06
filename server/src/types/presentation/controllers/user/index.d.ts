import {
  IHttpError,
  IHttpRequest,
  IHttpResponse,
  IJsonResponse,
} from "../../adapters";

interface IMakeGetAllUsersController {
  listUsers: () => Promise<IUser[]>;
}

interface IMakePostUserController {
  addUser: (userData: Partial<IUser>) => Promise<IUser>;
}

interface IMakeGetSingleUserController {
  getUser: (id: string) => Promise<IUser>;
}

interface IMakePatchUserController {
  editUser: (id: string, userData: Partial<IUser>) => Promise<IUser>;
}

interface IMakeDeleteUserController {
  removeUser: (id: string) => Promise<void>;
}

interface IGetAllUsers {
  (httpRequest: IHttpRequest): Promise<IHttpResponse>;
}

interface IUserRequest extends IHttpRequest {}

type IUserResponse = IHttpResponse | IHttpError;
type IUserListResponse = IHttpResponse | IHttpError;
