import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { string, z } from "zod";

const app = express();

const userSchema = z.object({
    fullName: string()
        .refine((val) => /^[a-zA-Z]+[-'s]?[a-zA-Z ]+$/.test(val), 'Name contains only alphabets').min(3).max(25),
})


app.post("api/v1/signup", (req, res) => {

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