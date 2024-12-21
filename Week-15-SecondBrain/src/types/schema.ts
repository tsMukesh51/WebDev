import { Request } from "express";
import { string, z } from "zod";

export const contentType = ['image', 'video', 'text', 'audio', 'sm-post'];

export const userSchema = z.object({
    fullName: string().min(3).max(25)
        .refine((val) => /[^a-zA-Z]+/.test(val), { message: 'Name should contain only alphabets, and Full name' }),
    username: string().min(3).max(20, { message: 'Username should contain only alphabets' }),
    email: string().email().max(50),
    password: string().min(6).max(24)
        .refine((val) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]+$/.test(val),
            { message: 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.' })
});

export class CustomError extends Error {
    statusCode: number;
    name: string;

    constructor(message: string, statusCode: number, name: string) {
        super(message);
        this.statusCode = statusCode;
        this.name = name;
    }
}

