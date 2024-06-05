export default function bankToObject(bank: IMakeBankMethods): IBank {
  return Object.freeze<IBank>({
    id: bank.getId(),
    accessToken: bank.getAccessToken(),
    accountId: bank.getAccountId(),
    fundingSourceUrl: bank.getFundingSourceUrl(),
    publicId: bank.getPublicId(),
    userId: bank.getUserId(),
  });
}
