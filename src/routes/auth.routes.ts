import { Router } from "express";
import {getProjectsByManager , login, getProtectedData } from "../controllers/auth.controller";

const router = Router();

// router.get("/:manager", getProjectsByManager);

router.post("/login", login);
router.post("/protected", getProtectedData);

export default router;