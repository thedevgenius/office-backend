import { Request, Response, RequestHandler } from "express";
import mongoose from "mongoose";
import Project from "../models/project.model";

export const getProjects = async (req: Request, res: Response) => {
    const projects = await Project.find();
    res.json(projects);
}

export const createProject = async (req: Request, res: Response) => {
    const project = new Project({ name: req.body.name });
    await project.save();
    res.status(201).json(project);
};

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