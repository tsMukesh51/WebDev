import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { CustRequest, CustResponse } from "../extraTypes";
import { JWT_SECRET } from "@repo/backend-common/config";

const secret = "fjlaskjffas";

const userAuth = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(' ')[1] ?? "";
    try {
        const decoded = jwt.verify(token, JWT_SECRET);

        if (decoded && typeof decoded != "string" && decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            res.status(403).send({
                message: "Unauthorized",
                error: {
                    name: "JsonWebTokenError"
                }
            });
            return;
        }
    } catch (err: any) {
        if (err.name === "JsonWebTokenError") {
            res.status(403).send({
                message: "Unauthorized",
                error: {
                    name: "JsonWebTokenError"
                }
            });
            return;
        }
        console.log(err);
        res.status(500).send({
            message: 'something went worng'
        })
    }
}

export { userAuth };