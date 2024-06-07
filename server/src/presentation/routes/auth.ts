import { Router } from "express";
import login from "../controllers/auth";
import makeCallback from "../adapters/express";
import { postUser } from "../controllers/user";

const router = Router();

router.post("/login", makeCallback(login));
router.post("/register", makeCallback(postUser));

export default router;
