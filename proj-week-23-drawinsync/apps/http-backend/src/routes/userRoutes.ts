import { Router } from "express";
import { CreateUserSchema, LoginUserSchema } from "@repo/lib/types";
import { prisma } from "@repo/db";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

const userRoute = Router();

userRoute.post('/signup', async (req, res) => {
    const { success, data, error } = CreateUserSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: "Invalid format",
            error: error.issues
        })
        return;
    }
    if (!process.env.HASH_PASSWORD_SECRET) {
        res.status(500).json({
            message: "Hash Secret not found"
        });
        return;
    }

    data.password = await argon2.hash(data.password, { secret: Buffer.from(process.env.HASH_PASSWORD_SECRET) });

    try {
        const newUser = await prisma.user.create({ data: data });
        res.json({
            message: "User created successfully",
            userId: newUser.id
        });
        return;
    } catch (err: any) {
        console.log(err);
        if (err.code === 'P2002') {
            res.status(411).json({
                message: "User already exists"
            });
            return;
        }
        res.status(500).json({
            message: "DB Connection Error occured"
        });
        return;
    }
});

userRoute.post('/signin', async (req, res) => {
    const { success, data, error } = LoginUserSchema.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: "Invalid format",
            error: error.issues
        })
        return;
    }

    try {
        const oldUser = await prisma.user.findFirst({ where: { userName: data.userName } });
        if (!oldUser) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }
        console.log(data.password);
        console.log(oldUser.password);
        if (!process.env.HASH_PASSWORD_SECRET) {
            res.status(500).json({
                message: "Hash Secret not found"
            });
            return;
        }
        const isAuthenticated = await argon2.verify(oldUser.password, data.password, { secret: Buffer.from(process.env.HASH_PASSWORD_SECRET) });
        console.log(isAuthenticated);
        if (isAuthenticated) {
            if (!process.env.JWT_SECRET) {
                res.status(500).json({
                    message: 'JWT_SECRET not found'
                });
                return;
            }
            const token = jwt.sign({ userId: oldUser.id, userName: oldUser.userName }, process.env.JWT_SECRET, { expiresIn: 24 * 3600 });
            res.json({
                message: 'Login successful',
                token: token
            });
            return;
        } else {
            res.status(400).json({
                message: "Incorrect Password"
            })
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "DB Connection Error occured"
        });
        return;
    }

});

export { userRoute };