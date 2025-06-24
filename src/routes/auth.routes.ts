import { Router } from "express";
import { createUser, getUsers, getProjectsByManager , login, getProtectedData } from "../controllers/auth.controller";

const router = Router();

router.post("/user/add", createUser);
router.get("/users", getUsers);
router.get("/:manager", getProjectsByManager);

router.post("/login", login);
router.post("/protected", getProtectedData);

export default router;