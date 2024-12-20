import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { CustomError } from "../schema";

export const userAuth = (req: Request, res: Response, next: () => void): void => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if (!token || !process.env.JWT_SECRET)
            throw new CustomError('Token is missing or JWT secret is not defined', 403, 'Env Variables');
        const userId = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = userId;
        next();
    } catch (err) {
        console.log(err);
        //@ts-ignore
        if (err.name === 'Env Variables') {
            res.status(500).json({
                msg: 'Internal Server Error'
            });
            return;
        }
        res.status(403).json({
            msg: 'Please login again'
        });
    }
}
