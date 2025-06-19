import { Router } from "express";
import { createUser, getUsers, getProjectsByManager } from "../controllers/auth.controller";

const router = Router();

router.post("/user/add", createUser);
router.get("/users", getUsers);
router.get("/:manager", getProjectsByManager);

export default router;