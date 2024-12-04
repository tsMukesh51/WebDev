const { Router } = require('express');
const { z } = require('zod');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { adminModel, courseModel } = require('../db');
const { adminAuth } = require('../middleware/adminAuth');

const adminRouter = Router();

adminRouter.post('/signup', async function (req, res) {
    const requiredBody = z.object({
        firstName: z.string().min(5).max(50),
        lastName: z.string().min(1).max(50),
        email: z.string().email().max(50),
        password: z.string().min(8).max(24)
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
        const hashedpass = await bcrypt.hash(req.body.password, 6)
        await adminModel.create({
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

adminRouter.post('/signin', async function (req, res) {
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

    const adminMN = await adminModel.findOne({
        email: req.body.email
    });
    if (adminMN) {
        const passValid = await bcrypt.compare(req.body.password, adminMN.password);
        if (passValid) {
            const jwtoken = jwt.sign({ id: adminMN._id }, process.env.JWT_ADMIN_SECRET);
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

adminRouter.get('/my-course', adminAuth, async function (req, res) {
    const adminCourses = await courseModel.find({
        courseAdmin: req.body.admin._id
    });
    if (adminCourses.length > 0) {
        res.json({
            msg: 'List of your courses',
            courses: adminCourses
        });
    } else {
        res.json({
            msg: 'No courses found',
        })
    }
});

adminRouter.post('/course', adminAuth, async function (req, res) {
    const requiredBody = z.object({
        courseName: z.string().min(3).max(75),
        price: z.number(),
        thumbnailUrl: z.string().url(),
        description: z.string().max(250)
    });
    const parsedBody = requiredBody.safeParse(req.body, requiredBody);
    if (!parsedBody) {
        res.status(401).json({
            msg: 'Invalid format',
            err: parsedBody.error.issues
        });
        return;
    }
    try {
        const courseCreation = await courseModel.create({
            courseName: req.body.courseName,
            price: req.body.price,
            thumbnailUrl: req.body.thumbnailUrl,
            description: req.body.description,
            courseAdmin: req.body.admin._id
        });
        res.json({
            msg: 'Course Created',
            courseId: courseCreation._id
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});

adminRouter.put('/course', adminAuth, async function (req, res) {
    const requiredBody = z.object({
        courseName: z.string().min(3).max(75),
        price: z.number(),
        thumbnailUrl: z.string().url(),
        description: z.string().max(250),
        courseId: z.string().length(24)
    });
    const parsedBody = requiredBody.safeParse(req.body, requiredBody);
    if (!parsedBody.success) {
        res.status(401).json({
            msg: 'Invalid format',
            err: parsedBody.error.issues
        });
        return;
    }

    console.log(req.body.admin._id);
    try {
        const courseUpdation = await courseModel.updateOne({
            _id: req.body.courseId,
            courseAdmin: req.body.admin._id
        }, {
            courseName: req.body.courseName,
            price: req.body.price,
            thumbnailUrl: req.body.thumbnailUrl,
            description: req.body.description,
        });
        if (courseUpdation == null) {// test this
            res.status(403).json({
                msg: 'Course Not Found'
            });
            return;
        }
        res.json({
            msg: 'Course Updated',
            courseId: courseUpdation._id
        });
    } catch (err) {
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});

module.exports = {
    adminRouter: adminRouter
}