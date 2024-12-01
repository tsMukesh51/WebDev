const { Router } = require('express');
const { adminModel } = require('../db');

const adminRouter = Router();

adminRouter.post('/signin', async function (req, res) {
    res.json({
        msg: 'hit /api/v1/admin/signin'
    });
});

adminRouter.post('/signup', async function (req, res) {
    res.json({
        msg: 'hit /api/v1/admin/signup'
    });
});

adminRouter.get('/all-course', async function (req, res) {
    res.json({
        msg: 'hit /api/v1/admin/all-course'
    });
});

adminRouter.put('/course', async function (req, res) {
    res.json({
        msg: 'hit /api/v1/admin/course'
    });
});

module.exports = {
    adminRouter: adminRouter
}