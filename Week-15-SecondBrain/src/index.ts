import express from "express";
import { json } from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { string, z } from "zod";

import { userSchema } from "./schema";
import { userModel } from "./db";

const app = express();
app.use(json());

app.post("api/v1/signup", async (req, res) => {
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
        res.json({
            msg: 'Account already exists'
        })
    }
});

app.post("api/v1/signin", (req, res) => {

});

app.get("api/v1/content", (req, res) => {

});

app.post("api/v1/content", (req, res) => {

});

app.delete("api/v1/content", (req, res) => {

});

app.post("api/v1/brain/share", (req, res) => {

});

app.get("api/v1/brain/:shareLink", (req, res) => {

});