import { Router } from "express";
import { createUser, getUsers, updateUser, bookUser, freeUser, getTeam } from "../controllers/user.controller";

const router = Router();

router.post("/user/add", ...createUser);
router.get("/users", getUsers);
router.put("/user/:userId/update", updateUser);
router.post("/user/book", bookUser);
router.post("/user/free", freeUser);
router.get("/:managerId/team", getTeam);

export default router;