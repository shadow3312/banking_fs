import makeBank from "@/domain/entities/bank";

export default function makeAddBankUseCase({
  repository,
  toObject,
}: IMakeObjectBankUseCase): (bankData: Partial<IBank>) => Promise<IBank> {
  return async function addBank(bankData: Partial<IBank>) {
    const bank = makeBank(bankData);
    const exists = await repository.findById(bank.getId());

    if (exists) {
      throw new Error(`Duplicate bank id`);
    }

    const bankObj = toObject(bank);
    const result = await repository.create(bankObj);
    return result;
  };
}
