import { PrismaClient } from "@prisma/client";
import express from "express";
import { json } from "express";


const app = express();
app.use(json());
const client = new PrismaClient({
    log: ['query'],
});

app.post('/api/signup', async function (req, res) {
    console.log(req);
    const createdUser = await client.user.create({
        data: {
            username: req.body.username,
            password: req.body.password,
            age: req.body.age,
        }
    });
    // const createdTodo = await client.todo.create({
    //     data: {
    //         title: 'Something',
    //         done: false,
    //         userId: 1,
    //         time: new Date()
    //     }
    // })
    res.json({
        msg: 'Created User',
        user: createdUser
    });
});

app.post('/api/todo', async function (req, res) {
    const createdTodo = await client.todo.create({
        data: {
            title: req.body,
            done: req.body.done,
            userId: req.body.userId,
            time: new Date()
        }
    })
    res.json({
        msg: 'Created Todo',
        user: createdTodo
    });
});

async function main() {
    try {
        await client.$connect();
        console.log('DB connected');
    } catch (e) {
        console.log('DB is unavailable');
        return;
    }
    app.listen(3000);
}

main();