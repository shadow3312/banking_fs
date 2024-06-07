import { Router } from "express";
import makeCallback from "../adapters/express";
import {
  deleteBank,
  getAllBanks,
  getSingleBank,
  patchBank,
  postBank,
} from "../../http/controllers/bank";

const router = Router();

router.get("/", makeCallback(getAllBanks));
router.post("/", makeCallback(postBank));
router.get(":id", makeCallback(getSingleBank));
router.patch(":id", makeCallback(patchBank));
router.delete(":id", makeCallback(deleteBank));

export default router;
