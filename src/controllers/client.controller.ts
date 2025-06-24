import { Request, Response } from "express";
import Client from "../models/client.model";
import User from "../models/user.model";
import authMiddleware from "../middleware/auth.middleware";

export const createClient = [
    authMiddleware,
    async (req: Request, res: Response) => {
        const { name, company } = req.body;
        const email = req.user?.email;
        const user = User.findOne({ email });
        try {
            const newClient = new Client({ name, company });
            await newClient.save()
            res.status(201).json({ 'message': 'New Client added', client: newClient });
        } catch (error) {
            res.status(500).json(error);
        }
    }
]