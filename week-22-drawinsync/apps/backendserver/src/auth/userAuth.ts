import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustRequest, CustResponse } from "../extraTypes";
import { JWT_SECRET } from "@repo/backend-common/config";

const secret = "fjlaskjffas";

const userAuth = async (req: CustRequest, res: CustResponse, next: NextFunction) => {
    const token = req.headers["authorization"] ?? "";
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded && typeof decoded != "string" && decoded.userId) {
        req.userId = decoded.userId;
        next();
    } else {
        res.status(403).send({
            message: "Unauthorized"
        });
    }
}

export { userAuth };