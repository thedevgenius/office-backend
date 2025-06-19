import { Router } from "express";
import { createUser } from "../controllers/auth.controller";

const router = Router();

router.post("/user/add", createUser);

export default router;