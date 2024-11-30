const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { z } = require('zod');
require('dotenv').config();

const { userModel, courseModel } = require('./db');

app = express();
app.use(express.json());

app.post('/signup', async function (req, res) {
    const requiredBody = z.object({
        firstName: z.string().min(5).max(50),
        lastName: z.string().min(1).max(50),
        email: z.string().email().max(50),
        password: z.string().min(6).max(24)
            .refine((password) => { return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&]).+$/.test(password) }, {
                message: 'Atleast one uppercase, lowercase, number, and special character'
            })
    });

    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        res.json({
            msg: 'Invalid format',
            err: parsedBody.error.issues
        });
        return;
    }

    try {
        const hashedpass = await bcrypt.hash(req.body.password, 5)
        await userModel.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedpass
        })
        res.json({
            msg: 'Account created'
        });
    } catch (err) {
        console.log(err);
        if (err.code == '11000') {
            res.json({
                msg: 'Email already in use'
            });
        } else {
            res.json({
                msg: 'Internal Server Error'
            });
        }
    }
});

app.post('/signin', async function (req, res) {

});

app.post('/purchase-course', async function (req, res) {

});
app.get('/my-course', async function (req, res) {

});
app.get('/all-course', async function (req, res) {

});

async function main() {
    await mongoose.connect(`${process.env.MONGO_URL}/skillschool`);
    app.listen(3000);
}

main();
