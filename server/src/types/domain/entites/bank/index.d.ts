interface IBank {
  id: string;
  accessToken: string;
  fundingSourceUrl: string;
  accountId: string;
  publicId: string;
  userId: string;
}

interface IBuildMakeBank {
  Id: IId;
}

interface IMakeBankMethods {
  getId: () => string;
  getAccessToken: () => string;
  getFundingSourceUrl: () => string;
  getAccountId: () => string;
  getPublicId: () => string;
  getUserId: () => string;
}
