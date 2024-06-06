import {
  IHttpError,
  IHttpRequest,
  IHttpResponse,
  IJsonResponse,
} from "../../adapters";

interface IMakeGetAllBanksController {
  listBanks: () => Promise<IBank[]>;
}

interface IMakePostBankController {
  addBank: (bankData: Partial<IBank>) => Promise<IBank>;
}

interface IMakeGetSingleBankController {
  getBank: (id: string) => Promise<IBank>;
}

interface IMakePatchBankController {
  editBank: (id: string, bankData: Partial<IBank>) => Promise<IBank>;
}

interface IMakeDeleteBankController {
  removeBank: (id: string) => Promise<void>;
}

interface IBankRequest extends IHttpRequest {}

type IBankResponse = IHttpResponse | IHttpError;
type IBankListResponse = IHttpResponse | IHttpError;
