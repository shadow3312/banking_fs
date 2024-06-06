import {
  listBanks,
  getBank,
  addBank,
  editBank,
  removeBank,
} from "@/application/usecases/bank";

import makeGetAllBanks from "./getAll";
import makeGetSingleBank from "./getById";
import makePostBank from "./post";
import makePatchBank from "./patch";
import makeDeleteBank from "./delete";

const getAllBanks = makeGetAllBanks({ listBanks });
const getSingleBank = makeGetSingleBank({ getBank });
const postBank = makePostBank({ addBank });
const patchBank = makePatchBank({ editBank });
const deleteBank = makeDeleteBank({ removeBank });

const bankController = Object.freeze({
  getAllBanks,
  getSingleBank,
  postBank,
  patchBank,
  deleteBank,
});

export { getAllBanks, getSingleBank, postBank, patchBank, deleteBank };

export default bankController;
