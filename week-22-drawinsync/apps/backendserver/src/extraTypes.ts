import { NextFunction, Request, Response } from "express";

interface CustRequest extends Request {
    userId: string
}

interface CustResponse extends Response {
    message: string,
}

export type {CustRequest, CustResponse}