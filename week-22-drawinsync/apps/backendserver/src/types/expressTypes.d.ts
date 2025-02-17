import Express from "express";

declare global {
    namespace Express {
        interface Request {
            userId: string
        }
        interface Response {
            message: string
            data: object
            error: object
        }
    }
}
