import { Request, Response, NextFunction } from "express";
import authMiddleware from "./auth.middleware";
import User from "../models/user.model";

export const checkPermission = (requiredPermission: string) => {
    return [
        authMiddleware,
        // async (req: Request, res: Response, next: NextFunction) => {
        //     try {
        //         const user = await User.findById(req.user.id).populate("role");

        //         if (!user) return res.status(401).json({ error: "User not found" });

        //         const allPermissions = new Set(
        //             user.role.flatMap((role: any) => role.permissions)
        //         );

        //         if (!allPermissions.has(requiredPermission)) {
        //             return res.status(403).json({ error: "Permission denied" });
        //         }

        //         next();
        //     } catch (err) {
        //         return res.status(500).json({ error: "Internal server error" });
        //     }
        // }
    ];
};
