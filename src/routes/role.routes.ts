import { Router } from "express";
import { createRole, getRoles } from "../controllers/role.controller";

const router = Router();

router.post('/role/add', createRole);
router.get('/roles', getRoles);

export default router;