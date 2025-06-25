import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/user.model';
import Project from "../models/project.model";
import authMiddleware from "../middleware/auth.middleware";

const saltRounds = 10;
const SECRECT_KEY = 'office_login';

export const getProjectsByManager = async (req: Request, res: Response) => {
    const managerId = req.params.manager;
    const manager = await User.findById(managerId);
    // console.log(manager);
    const projects = await Project.find({'manager':managerId});
    res.status(200).json({manager: manager?.name, projects: projects});
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ 'message': 'User not found' });
            return;
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({ 'message': 'Invalid credentials' });
            return;
        }
        const token = jwt.sign({ id: user._id, email: user.email }, SECRECT_KEY, { expiresIn: '1d' });
        res.cookie('accessToken', token, {
            httpOnly: true,
            sameSite: 'none', // Use 'none' for cross-site cookies
            secure: true,     // Required for 'none' sameSite, only works over HTTPS
            maxAge: 24 * 60 * 60 * 1000, // 1 day
            path: '/',
            // domain: 'your-frontend-domain.com' // Uncomment and set if needed
        });
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getProtectedData = async (req: Request, res: Response) => {
    const email = req.user.email;
    const user = await User.findOne({ email });
    console.log(user);
    res.status(200).json({ message: "This is protected data."});
}