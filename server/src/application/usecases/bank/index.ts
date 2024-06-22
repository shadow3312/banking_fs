import bankRepository from "@/infrastructure/data/repositories/bank";
import makeAddBankUseCase from "./add";
import makeGetBankUseCase from "./get";
import makeListBanksUseCase from "./list";
import makeEditBankUseCase from "./edit";
import makeRemoveBankUseCase from "./remove";
import bankToObject from "@/application/mappers/bank";
import makeGetBanksByUserUseCase from "./getByUser";
import makeGetBanksByAccountUseCase from "./getByAccount";

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

const getBanksByUser = makeGetBanksByUserUseCase({
  repository: bankRepository,
});

const getBanksByAccount = makeGetBanksByAccountUseCase({
  repository: bankRepository,
});

const bankUseCases = Object.freeze({
  addBank,
  listBanks,
  getBank,
  getBanksByUser,
  getBanksByAccount,
  editBank,
  removeBank,
});

export {
  addBank,
  getBank,
  getBanksByUser,
  getBanksByAccount,
  listBanks,
  editBank,
  removeBank,
};

export default bankUseCases;
