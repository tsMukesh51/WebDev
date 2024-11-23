const express = require("express");
const { userModel, todoModel } = require("./db");
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'getOut';
const app = express();
const connection = mongoose.connect('mongodb+srv://testUser:44YwQ4GB9FBY71JV@cluster0.tabzq.mongodb.net/todo-app')

app.use(express.json());

function auth(req, res, next) {
    const token = req.headers.token;
    try {
        user = jwt.verify(token, JWT_SECRET);
        req.userId = user.id;
        next();
    }
    catch {
        res.status(403).json({
            msg: "Please login to continue"
        });
    }
}

app.post("/signup", async function (req, res) {
    const { name, email, password } = req.body;
    const creating = await userModel.create({
        name: name,
        email: email,
        password: password
    });
    console.log(creating);
    res.json({
        msg: 'Account created'
    });
});


app.post("/signin", async function (req, res) {
    const { email, password } = req.body;
    const user = await userModel.findOne({
        email: email,
        password: password
    });
    if (user) {
        const userjwt = jwt.sign({ id: user._id }, JWT_SECRET);
        res.json({ token: userjwt });
    }
    else {
        res.status(403).json({
            msg: "Wrong credentials"
        })
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
