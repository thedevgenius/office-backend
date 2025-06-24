import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

// Extend Express Request interface to include 'user'
declare global {
    namespace Express {
        interface Request {
            user?: any;
        }
    }
}

const SECRECT_KEY = 'office_login';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.accesstoken;
    if (!token) {
        res.status(401).json('No token provided');
        return;
    }
    try {
        const decoded = jwt.verify(token, SECRECT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(500).json(error);
    }


}

export default authMiddleware;
