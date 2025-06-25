import { Router } from "express";
import { createUser, getUsers, updateUser } from "../controllers/user.controller";

const router = Router();

router.post("/user/add", ...createUser);
router.get("/users", getUsers);
router.put("/user/:userId/update", updateUser);

export default router;