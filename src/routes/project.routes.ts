import { Router } from "express";
import { getProjects, createProject, getProject, updateProject } from "../controllers/project.controller";

const router = Router();

router.get('/projects', getProjects);
router.post('/projects/add', createProject);
router.get('/project/:id', getProject);
router.put('/project/:id', updateProject);

export default router;
