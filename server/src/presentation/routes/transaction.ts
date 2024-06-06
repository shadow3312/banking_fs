import { Router } from "express";
import makeCallback from "../adapters/express";
import {
  deleteTransaction,
  getAllTransactions,
  getSingleTransaction,
  patchTransaction,
  postTransaction,
} from "../controllers/transaction";

const router = Router();

router.get("/", makeCallback(getAllTransactions));
router.post("/", makeCallback(postTransaction));
router.get(":id", makeCallback(getSingleTransaction));
router.patch(":id", makeCallback(patchTransaction));
router.delete(":id", makeCallback(deleteTransaction));

export default router;
