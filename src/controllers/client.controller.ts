import { Request, Response } from "express";
import Client from "../models/client.model";
import User from "../models/user.model";
import authMiddleware from "../middleware/auth.middleware";

export const createClient = [
    authMiddleware,
    async (req: Request, res: Response) => {
        const { name, company, email } = req.body;
        try {
            const newClient = new Client({ name, company, email });
            await newClient.save();
            res.status(201).json({ message: "Client created successfully", client: newClient });
        } catch (error) {
            res.status(500).json({ message: "Internal server error", error });
        }
    }
]