import { Router } from "express";
import { createRole, getRoles, updateRole, deleteRole } from "../controllers/role.controller";

const router = Router();

router.post('/role/add', createRole);
router.get('/role/all', getRoles);
router.put('/role/:roleId/update', updateRole);
router.delete('/role/:roleId/delete', deleteRole);

export default router;