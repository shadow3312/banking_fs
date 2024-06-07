import { Router } from "express";
import login from "../../http/controllers/auth";
import makeCallback from "../adapters/express";
import { postUser } from "../../http/controllers/user";

const router = Router();

router.post("/login", makeCallback(login));
router.post("/register", makeCallback(postUser));

export default router;
