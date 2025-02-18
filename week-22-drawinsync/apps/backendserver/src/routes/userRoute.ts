import { Request, Response, Router } from "express";
import { prisma } from "@repo/db";
import { CreateUserSchema } from "@repo/common"
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const userRoute = Router();

userRoute.post('/signup', async (req: Request, res: Response) => {
    const { success, data, error } = CreateUserSchema.safeParse(req.body);
    if (!success) {
        res.status(403).send({
            message: "Invalid format",
            data: null,
            errors: error.issues
        });
        return;
    }
    try {
        const newUser = await prisma.user.create({
            data: {
                fullName: data.fullName,
                username: data.username,
                email: data.email,
                password: data.password
            }
        });
        res.json({
            message: 'Account created Successfully',
            data: null,
            error: null
        })
    } catch (err) {
        res.status(500).send({
            message: 'Something went wrong'
        })
    }
});

userRoute.post('/signin', async (req, res) => {
    try {
        const existingUser = await prisma.user.findUnique({
            where: {
                username: req.body.username,
            }
        },)
        if (!existingUser) {
            res.status(404).send({
                message: 'Account not found',
                data: null,
                error: null
            });
            return;
        }
        if (existingUser.password != req.body.password) {
            res.status(411).send({
                message: 'Invalid Creadentials',
                data: null,
                error: null
            });
            return;
        }
        const token = jwt.sign({ userId: existingUser.id }, JWT_SECRET);
        res.json({
            message: 'Logged in Successfully',
            token: `Bearer ${token}`
        })
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Something went wrong'
        });
        return;
    }
});

export { userRoute };