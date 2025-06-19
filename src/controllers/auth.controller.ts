import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import Project from "../models/project.model";

const saltRounds = 10;

export const createUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: "User already exists" });
            return;
        }
        const newUser = new User({ name, email, password: hashedPassword });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
    }
}

export const getUsers = async (req: Request, res: Response) => {
    const users = await User.find();
    if (users.length === 0) {
        res.status(200).json({ message: 'No user found' });
        return;
    }
    res.status(200).json(users);
}

export const getProjectsByManager = async (req: Request, res: Response) => {
    const managerId = req.params.manager;
    const manager = await User.findById(managerId);
    // console.log(manager);
    const projects = await Project.find({'manager':managerId});
    res.status(200).json({manager: manager?.name, projects: projects});
}