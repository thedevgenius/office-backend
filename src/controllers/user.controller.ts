import { Request, Response } from "express";
import authMiddleware from "../middleware/auth.middleware";
import { checkPermission } from "../middleware/role.middleware";
import bcrypt from 'bcrypt';
import User from '../models/user.model';
import Role from "../models/role.models";

const saltRounds = 10;

export const createUser = [
    // checkPermission("userAdd"),
    async (req: Request, res: Response) => {
        try {
            const { name = "", email = "", password = "", phone = "", roles = [], reportingManager, designation, gender, dateOfBirth, address, lastQualification, totalExperience, prevCompany } = req.body;

            if (!name || !email || !password) {
                res.status(400).json({ message: "Name, email, and password are required" });
                return;
            }

            const existingUser = await User.findOne({ email });
            if (existingUser) {
                res.status(400).json({ message: "User already exists" });
                return;
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const roleArray: string[] = Array.isArray(roles)
                ? roles
                : typeof roles === "string"
                ? [roles]
                : [];

            const newUser = new User({
                name,
                email,
                phone,
                password: hashedPassword,
                roles: roleArray,
                reportingManager,
                designation,
                gender,
                dateOfBirth,
                address,
                lastQualification,
                totalExperience,
                prevCompany,
                joinDate: new Date(),
                lastLogin: null
            });

            await newUser.save();

            res.status(201).json({
                message: "User created successfully",
                user: {
                    id: newUser._id,
                    name: newUser.name,
                    email: newUser.email,
                    phone: newUser.phone,
                    roles: newUser.roles,
                    designation: newUser.designation,
                    gender: newUser.gender
                }
            });
            return;
        } catch (error: any) {
            console.error("Create user error:", error);
            res.status(500).json({ message: "Error creating user", error: error.message });
            return
        }
    }
];

export const getUsers = async (req: Request, res: Response) => {
    try {
        const role = req.query.role;
        let users: any[] = [];
        if (role) {
            const roleDoc = await Role.findOne({ name: role });
            if (!roleDoc) {
                users = [];
            } else {
                users = await User.find({ role: roleDoc._id })
                    .select('name email role')
                    .populate({ path: 'role', select: 'name' });
            }
        } else {
            users = await User.find()
                .select('name email roles status')
                .populate({ path: 'roles', select: 'name' });
        }

        if (!users || users.length === 0) {
            res.status(200).json({ message: 'No user found' });
            return;
        }
        res.status(200).json(users);
    } catch (error: any) {
        console.error("Get users error:", error);
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const updateData = req.body;
    const user = await User.findByIdAndUpdate(userId, updateData, {
        new: true, runValidators: true
    });

    if (!user) {
        res.status(404).json({ 'message': 'User not found' });
        return;
    }

    res.status(200).json(user)

}

export const bookUser = [
    authMiddleware,
    async (req: Request, res: Response) => {
        const manager = req.user;
        const userId = req.body.user;
        try {
            const user = await User.findById(userId);
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            if (!user.status || user.status !== 'Available') {
                res.status(400).json({ message: "User is not available" });
                return;
            }
            const updatedUser = await User.findByIdAndUpdate(userId, {
                'assignedManager': manager.id,
                'status': 'Booked'
            }, { new: true, runValidators: true });

            res.status(200).json({ 'message': 'User booked successfully', user: updatedUser });
        } catch (error: any) {
            res.status(500).json({ message: "Error booking user", error: error.message });
        }
    }
];

export const freeUser = [
    authMiddleware,
    async (req: Request, res: Response) => {
        const manager = req.user;
        const userId = req.body.user;
        try {
            const user = await User.findById(userId).populate('assignedManager', 'id');
            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }
            if (user.status === 'Available') {
                res.status(400).json({ message: "User is already available" });
                return;
            }
            if (user.assignedManager.id !== manager.id) {
                res.status(403).json({ message: "You are not authorized to free this user" });
                return;
            }

            const updatedUser = await User.findByIdAndUpdate(userId, {
                'assignedManager': null,
                'status': 'Available'
            }, { new: true, runValidators: true });

            res.status(200).json({ 'message': 'User freed successfully', user: updatedUser });
        } catch (error: any) {
            res.status(500).json({ message: "Error freeing user", error: error.message });
        }
    }
];

export const getTeam = [
    async (req: Request, res: Response) => {
        const managerId = req.params.managerId;
        try {
            const team = await User.find({ reportingManager: managerId })
                .select('name email phone designation status roles')
                .populate({ path: 'roles', select: 'name' });

            if (!team || team.length === 0) {
                res.status(200).json({ message: 'No team members found' });
                return;
            }

            res.status(200).json(team);
        } catch (error: any) {
            console.error("Get team error:", error);
            res.status(500).json({ message: "Error fetching team", error: error.message });
        }
    }
];