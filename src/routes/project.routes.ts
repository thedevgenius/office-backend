import { Router } from "express";
import { getProjects, createProject, getProject, updateProject, createCredential } from "../controllers/project.controller";

const router = Router();

router.get('/projects', getProjects);
router.post('/project/add', createProject);
router.get('/project/:id', getProject);
router.put('/project/:id', updateProject);

router.post('/project/:projectId/credential', createCredential);

export default router;
