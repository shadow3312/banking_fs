import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

interface IHttpRequest {
  body: any;
  query: ParsedQs;
  params: ParamsDictionary;
  method: string;
  ip: string | undefined;
  path: string;
  headers: {
    "Content-type": string | undefined;
    Referer: string | undefined;
    "User-agent": string | undefined;
  };
}

export interface IJsonResponse {
  statusCode: number;
  body: any;
}

interface IHttpError {
  statusCode: number;
  body: {
    error: string;
  };
}

interface IHttpResponse<T> {
  statusCode: number;
  headers?: { [key: string]: string };
  body: T;
}

type IController = (httpRequest: IHttpRequest) => Promise<IHttpResponse>;

interface IControllerRequest<T> extends IHttpRequest<T> {}
interface IControllerResponse<T> extends IHttpResponse<T> {}

export { IHttpRequest, IHttpResponse, IController, IHttpError };
