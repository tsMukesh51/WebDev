import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const userAuth = (req: Request, res: Response, next: () => void): void => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if (token && process.env.JWT_SECRET) {
            const userId = jwt.verify(token, process.env.JWT_SECRET);
            req.body.userId = userId;
            next();
        }
    } catch (err) {
        res.status(403).json({
            msg: 'Please login again'
        })
    }
}

