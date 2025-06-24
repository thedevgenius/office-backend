import { Request, Response, RequestHandler } from "express";
import mongoose from "mongoose";
import Project from "../models/project.model";
import authMiddleware from "../middleware/auth.middleware";

export const getProjects = async (req: Request, res: Response) => {
    const projects = await Project.find();
    res.json(projects);
}

export const createProject = [
    authMiddleware,
    async (req: Request, res: Response) => {
        const userId = req.user?.id;
        const { name, client, status, techstack } = req.body;
        const techArray = Array.isArray(techstack) ? techstack : typeof techstack === 'string' ? [techstack] : [];
        const project = new Project({ name, manager: userId, client, status, techstack: techArray });
        await project.save();
        res.status(201).json(project);
    }
]

export const createCredential = [
    authMiddleware,
    async (req: Request, res: Response) => {
        const projectId = req.params.projectId;
        const { title, url, username, password } = req.body;
        try {
            const project = await Project.findById(projectId);
            project?.credentials.push({ title, url, username, password });
            await project?.save();
            res.status(200).json(project)
        } catch (error) {
            res.status(500).json(error)
        }
    }
]

export const getProject = async (req: Request, res: Response) => {
    const project = await Project.findById(req.params.id);
    if (!project) {
        res.status(404).json({ message: 'Not found' });
        return;
    }
    res.json(project);
};

export const updateProject = async (req: Request, res: Response) => {
    const { id } = req.params;
    const updateData = req.body;

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
    });

    if (!updatedProject) {
        res.status(404).json({ message: 'Project not found' });
        return;
    }

    res.status(200).json(updatedProject);
}