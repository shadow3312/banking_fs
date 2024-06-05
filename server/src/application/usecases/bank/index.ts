import bankRepository from "@/infrastructure/data/repositories/bank";
import makeAddBankUseCase from "./add";
import makeGetBankUseCase from "./get";
import makeListBanksUseCase from "./list";
import makeEditBankUseCase from "./edit";
import makeRemoveBankUseCase from "./remove";
import bankToObject from "@/application/mappers/bank";

const addBank = makeAddBankUseCase({
  repository: bankRepository,
  toObject: bankToObject,
});

const editBank = makeEditBankUseCase({
  repository: bankRepository,
  toObject: bankToObject,
});

const getBank = makeGetBankUseCase({
  repository: bankRepository,
});

const listBanks = makeListBanksUseCase({
  repository: bankRepository,
});

const removeBank = makeRemoveBankUseCase({
  repository: bankRepository,
});

const bankUseCases = Object.freeze({
  addBank,
  listBanks,
  getBank,
  editBank,
  removeBank,
});

export { addBank, getBank, listBanks, editBank, removeBank };

export default bankUseCases;
