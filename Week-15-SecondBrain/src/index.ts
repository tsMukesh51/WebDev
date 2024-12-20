import express from "express";
import { json } from "express";
import mongoose, { Error } from "mongoose";
import jwt from "jsonwebtoken";
import { string, z } from "zod";
import dotenv from "dotenv"

import { userSchema } from "./schema";
import { userModel } from "./db";
import { userAuth } from "./middleware/users";

const app = express();
app.use(json());
dotenv.config();

app.post("/api/v1/signup", async (req, res) => {
    const { success, data, error } = userSchema.safeParse(req.body);
    if (!success) {
        res.status(411).json({
            msg: 'Invalid Format',
            err: error.errors
        })
        return;
    }
    try {
        const createdUser = await userModel.create(req.body);
        res.json({
            msg: 'Account created'
        });
    } catch (err) {
        //@ts-ignore
        if (err.code == '11000') {
            res.status(403).json({
                msg: 'Email already in use'
            });
        }
        res.status(403).json({
            msg: 'Account already exists'
        });
    }
});

app.post("/api/v1/signin", async (req, res) => {
    const { success, data, error } = userSchema.pick({
        username: true,
        password: true,
    }).safeParse(req.body);
    if (!success) {
        res.status(411).json({
            msg: 'Invalid Format',
            err: error.errors
        })
        return;
    }
    try {
        const currentUser = await userModel.findOne({ username: req.body.username });
        if (currentUser) {
            if (currentUser.password === req.body.password) {
                if (process.env.JWT_SECRET) {
                    const jwttoken = jwt.sign({ username: currentUser.username }, process.env.JWT_SECRET);
                    res.json({
                        msg: 'Login Successful',
                        token: `Bearer ${jwttoken}`
                    });
                } else {
                    res.status(500).json({
                        msg: 'Internal Server Error'
                    })
                }
            } else {
                res.status(403).json({
                    msg: 'Wrong Credentials'
                });
            }
        } else {
            res.status(403).json({
                msg: 'Account does not exists'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});

app.get("/api/v1/content", userAuth, (req, res) => {
    res.json({
        msg: 'Welcome to contents'
    })
});

app.post("/api/v1/content", (req, res) => {

});

app.delete("/api/v1/content", (req, res) => {

});

app.post("/api/v1/brain/share", (req, res) => {

});

app.get("/api/v1/brain/:shareLink", (req, res) => {

});

const main = async (): Promise<any> => {
    if (!process.env.MONGO_URL) {
        console.log('Mongo Url not found');
        return;
    }
    mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log('Server Started');
}

main();