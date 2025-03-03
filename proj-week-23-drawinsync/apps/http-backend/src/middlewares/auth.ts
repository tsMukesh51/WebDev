import { prisma } from "@repo/db";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        res.status(403).json({
            message: 'Authorization token is Empty'
        });
        return;
    }
    if (!process.env.USER_JWT_SECRET) {
        res.status(500).json({
            message: "USER_JWT_SECRET not found"
        });
        return;
    }
    const oldUser = jwt.verify(token, process.env.USER_JWT_SECRET);
    if (typeof oldUser == "string") {
        res.status(403).json({
            message: "Invalid token"
        });
        return;
    }
    const oldUserDb = await prisma.user.findFirst({ where: { id: oldUser.userId, userName: oldUser.userName } });
    if (!oldUserDb) {
        res.status(404).json({
            message: "User not found in DB"
        });
        return;
    }
    req.userId = oldUserDb.id;
    next();
}

export const something = (req: Request, res: Response, next: NextFunction) => {
    console.log('board route');
    next();
}