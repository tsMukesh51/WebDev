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
            message: "USER SECRET not found"
        });
        return;
    } try {
        const oldUser = jwt.verify(token, process.env.USER_JWT_SECRET);
        if (typeof oldUser == "string") {
            res.status(403).json({
                message: "Invalid Token"
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
    } catch (err: any) {
        console.log(JSON.stringify(err));
        if (err.name === "JsonWebTokenError" && err.message == "invalid signature") {
            res.status(401).json({
                message: "Invalid Token"
            });
            return;
        }
        if (err.name === "TokenExpiredError" && err.message == "jwt expired") {
            res.status(401).json({
                message: "Token Expired"
            });
            return;
        }
        res.status(500).json({
            message: "something went wrong"
        });
        return;
    }

}

export const something = (req: Request, res: Response, next: NextFunction) => {
    console.log('board route');
    next();
}