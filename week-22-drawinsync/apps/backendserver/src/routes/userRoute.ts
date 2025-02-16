import { Router } from "express";
import { prisma } from "@repo/db";

const userRoute = Router();

userRoute.post('/signup', async (req, res) => {
    prisma.user.create({
        data: {
            username: 'Mukesh',
            email: 'mukesha@email.com',
            password: 'a$dF8u7y'
        }
    });
    res.json({
        message: 'Account created Successfully'
    })
});

userRoute.post('/signin', async (req, res) => {
    res.json({
        message: 'Logged in Successfully'
    })
});

export { userRoute };