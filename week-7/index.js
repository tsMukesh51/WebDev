const express = require("express");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { z } = require('zod');
const { userModel, todoModel } = require("./db");
const { JWT_SECRET, auth } = require('./auth');

const app = express();
const connection = mongoose.connect('mongodb+srv://testUser:44YwQ4GB9FBY71JV@cluster0.tabzq.mongodb.net/todo-app')

app.use(express.json());


app.post("/signup", async function (req, res) {
    const reqBody = z.object({
        email: z.string().email().max(50),
        password: z.string().min(6)
            .refine((password) => {
                /[A-Z]/.test(password)
            }, { message: "Required one upper case letter." })
            .refine((password) => {
                /[a-z]/.test(password)
            }, { message: "Required one lower case letter." })
            .refine((password) => {
                /[0-9]/.test(password)
            }, { message: "Required one number letter." })
            .refine((password) => {
                /[!@#$%^&*]/.test(password)
            }, { message: "Required one special charecter." }),
        name: z.string().min(5).max(50)
    });

    const parsedBody = reqBody.safeParse(req.body);
    if (!parsedBody.success) {
        res.json({
            msg: "Incorrect format",
            error: parsedBody.error.issues
        })
        return;
    }

    const hashedPass = await bcrypt.hash(password, 5);
    try {
        const creating = await userModel.create({
            name: name,
            email: email,
            password: hashedPass
        });
        res.json({
            msg: 'Account created'
        });
    } catch (err) {
        console.log(err);
        res.json({
            msg: 'Email Id already in use'
        })
    }
});


app.post("/signin", async function (req, res) {
    const reqBody = z.object({
        email: z.string().email().max(50),
        password: z.string().min(6)
            .refine((password) => {
                /[A-Z]/.test(password)
            }, { message: "Required one upper case letter." })
            .refine((password) => {
                /[a-z]/.test(password)
            }, { message: "Required one lower case letter." })
            .refine((password) => {
                /[0-9]/.test(password)
            }, { message: "Required one number letter." })
            .refine((password) => {
                /[!@#$%^&*]/.test(password)
            }, { message: "Required one special charecter." })
    });

    const parsedBody = reqBody.safeParse(req.body);
    if (!parsedBody.success) {
        res.json({
            msg: "Incorrect format",
            error: parsedBody.error.issues
        })
        return;
    }

    const { email, password } = req.body;
    const user = await userModel.findOne({
        email: email
    });
    if (user) {
        const isValidPass = await bcrypt.compare(password, user.password);
        if (isValidPass) {
            const userjwt = jwt.sign({ id: user._id }, JWT_SECRET);
            res.json({ token: userjwt });
        } else {
            res.status(403).json({
                msg: 'Wrong password'
            });
        }
    }
    else {
        res.status(404).json({
            msg: "Account with email not found"
        });
    }

});

app.use(auth);

app.post("/todo", async function (req, res) {
    const creatTodo = todoModel.create({
        title: req.body.title,
        isCompleted: req.body.isCompleted ? req.body.isCompleted : false,
        userId: req.userId
    });
    creatTodo
        .then((data) => {
            res.json({
                todo: data,
                msg: 'todo created'
            });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                msg: 'Something went wrong'
            })
        })
});


app.get("/todos", function (req, res) {
    todoModel.find({
        userId: req.userId
    })
        .then((data) => {
            res.json(data);
        })
        .catch((err) => {
            console.log(err);
            res.status(404).json({
                msg: 'Not found'
            });
        })
});

connection.then(app.listen(3000));
