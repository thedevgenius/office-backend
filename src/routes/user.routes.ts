import { Router } from "express";
import { createUser, getUsers, updateUser, bookUser } from "../controllers/user.controller";

const router = Router();

router.post("/user/add", ...createUser);
router.get("/users", getUsers);
router.put("/user/:userId/update", updateUser);
router.post("/user/book", bookUser);

export default router;