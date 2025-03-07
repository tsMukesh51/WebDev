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
        console.log(JSON.stringify(err));;
        if (err.name == "PrismaClientKnownRequestError" && err.code === 'P2002') {
            res.status(409).json({
                message: "User already exists",
                alreadyTaken: err.meta.target
            });
            return;
        }
        res.status(500).json({
            message: "DB Connection Error occured"
        });
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
        if (!process.env.HASH_PASSWORD_SECRET) {
            res.status(500).json({
                message: "Hash Secret not found"
            });
            return;
        }
        const isAuthenticated = await argon2.verify(oldUser.password, data.password, { secret: Buffer.from(process.env.HASH_PASSWORD_SECRET) });
        if (isAuthenticated) {
            if (!process.env.USER_JWT_SECRET) {
                res.status(500).json({
                    message: 'USER_JWT_SECRET not found'
                });
                return;
            }
            const token = jwt.sign({ userId: oldUser.id, userName: oldUser.userName }, process.env.USER_JWT_SECRET, { expiresIn: 24 * 3600 });
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
        console.log(JSON.stringify(err));;
        res.status(500).json({
            message: "DB Connection Error occured"
        });
        return;
    }

});

export { userRoute };