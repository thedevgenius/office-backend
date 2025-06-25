import { Request, Response } from "express";
import Role from '../models/role.models';

export const createRole = async (req: Request, res: Response) => {
    try {
        const { name, permissions } = req.body;
        const permissionArray = Array.isArray(permissions) ? permissions : typeof permissions === 'string' ? [permissions] : [];
        const newRole = new Role({ name, permissions: permissionArray });
        await newRole.save();
        res.status(201).json(newRole);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const getRoles = async (req: Request, res: Response) => {
    try {
        const roles = await Role.find();
        res.status(200).json(roles);
    } catch (error) {
        res.status(500).json(error);
    }
}