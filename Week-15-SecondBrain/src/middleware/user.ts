import { Request, Response, NextFunction } from "express";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";

import { CustomError } from "../types/schema";

export const userAuth = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.headers.authorization?.split(' ')[1];
    try {
        if (!token || !process.env.JWT_SECRET)
            throw new CustomError('Token is missing or JWT secret is not defined', 403, 'Env Variables');
        const validUser = jwt.verify(token, process.env.JWT_SECRET);
        if (!(validUser as JwtPayload).id)
            throw JsonWebTokenError;
        req.userId = (validUser as JwtPayload).id;
        next();
    } catch (err: any) {
        console.log(err);
        if (err.name === 'Env Variables') {
            res.status(500).json({
                msg: 'Internal Server Error'
            });
            return;
        }
        res.status(403).json({
            msg: 'Authentication Error'
        });
    }
}
