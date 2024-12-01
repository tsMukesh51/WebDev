const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const { z } = require('zod');
require('dotenv').config();

const { userRouter } = require('./routes/user');
const { adminRouter } = require('./routes/admin');
const { courseRouter } = require('./routes/course');

app = express();
app.use(express.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/admin', adminRouter);
app.use('/api/v1/course', courseRouter)

async function main() {
    await mongoose.connect(`${process.env.MONGO_URL}/skillschool`);
    app.listen(3000);

    console.log('Server Started');
}

main();
