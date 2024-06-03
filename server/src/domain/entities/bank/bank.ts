export default function buildMakeBank({
  Id,
}: IBuildMakeBank): (bank: IBank) => IMakeBankMethods {
  return function makeBank({
    id = Id.makeId(),
    accessToken,
    fundingSourceUrl,
    accountId,
    publicId,
    userId,
  }: IBank): IMakeBankMethods {
    //#region field validation
    if (!Id.isValidId(id)) {
      throw new Error(`Bank must have a valid id`);
    }
    if (!accessToken) {
      throw new Error(`accessToken is required`);
    }
    if (!fundingSourceUrl) {
      throw new Error(`fundingSourceUrl is required`);
    }

    if (!accountId) {
      throw new Error(`accountId is required`);
    }
    if (!publicId) {
      throw new Error(`publicId is required`);
    }
    if (!userId) {
      throw new Error(`userId is required`);
    }
    //#endregion

    return Object.freeze<IMakeBankMethods>({
      getId: () => id,
      getAccessToken: () => accessToken,
      getFundingSourceUrl: () => fundingSourceUrl,
      getAccountId: () => accountId,
      getPublicId: () => publicId,
      getUserId: () => userId,
    });
  };
}
