import { Router } from "express";
import makeCallback from "../adapters/express";
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  patchUser,
  postUser,
} from "../../http/controllers/user";
import isAuthenticated from "../middlewares";

const router = Router();

router.get("/", makeCallback(getAllUsers));
router.post("/", makeCallback(postUser));
router.get("/:id", makeCallback(getSingleUser));
router.patch("/:id", makeCallback(patchUser));
router.delete("/:id", makeCallback(deleteUser));

export default router;
