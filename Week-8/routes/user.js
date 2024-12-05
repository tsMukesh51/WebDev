const { Router } = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { z } = require('zod');
require('dotenv').config();

const { adminModel, userModel, purchaseModel, courseModel } = require('../db');
const { userAuth } = require('../middleware/userAuth');

const userRouter = Router();

userRouter.post('/signup', async function (req, res) {
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
        res.status(403).json({
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
            res.status(403).json({
                msg: 'Email already in use'
            });
        } else {
            res.status(500).json({
                msg: 'Internal Server Error'
            });
        }
    }
});

userRouter.post('/signin', async function (req, res) {
    const requiredBody = z.object({
        email: z.string().email().max(50),
        password: z.string().min(6).max(24)
            .refine((password) => { return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&]).+$/.test(password) }, {
                message: 'Atleast one uppercase, lowercase, number, and special character'
            })
    });

    const parsedBody = requiredBody.safeParse(req.body);
    if (!parsedBody.success) {
        res.status(403).json({
            msg: 'Invalid format',
            err: parsedBody.error.issues
        });
        return;
    }

    const userMN = await userModel.findOne({
        email: req.body.email
    });
    if (userMN) {
        const passValid = await bcrypt.compare(req.body.password, userMN.password);
        if (passValid) {
            const jwtoken = jwt.sign({ id: userMN._id }, process.env.JWT_SECRET);
            res.json({
                msg: 'Login Success',
                token: jwtoken
            });
        } else {
            res.status(403).json({
                msg: 'Password Incorrect'
            });
        }
    } else {
        res.status(403).json({
            msg: 'Account with email Not Found'
        });
    }
});


userRouter.get('/my-course', userAuth, function (req, res) {
    let myCourse = [];
    try {
        const purchasedCourseMN = purchaseModel.find({
            userId: req.body.user._id
        });
        const coursesMN = courseModel.find({});
        adminModel.find({}).then((adminList) => {
            coursesMN.then((courseList) => {
                purchasedCourseMN.then((purchasedCourseList) => {
                    purchasedCourseList.forEach((purchasedCourse) => {
                        let row = {};
                        const ccourse = courseList.find((course) => {
                            return course._id.toString() === purchasedCourse.courseId.toString();
                        });
                        const courseAdmin = adminList.find((admin) => {
                            return admin._id.toString() === ccourse.courseAdmin.toString();
                        });
                        row['id'] = ccourse._id;
                        row['courseName'] = ccourse.courseName;
                        row['price'] = ccourse.price;
                        row['thumbnailUrl'] = ccourse.thumbnailUrl;
                        row['description'] = ccourse.description;
                        row['courseCreator'] = courseAdmin.firstName;
                        myCourse.push(row);
                    });
                    res.json({
                        msg: 'Your purchased courses',
                        courseList: myCourse
                    });
                });
            });
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }

});

module.exports = {
    userRouter: userRouter
}