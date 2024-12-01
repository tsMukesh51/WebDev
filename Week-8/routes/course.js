const { Router } = require('express');

const { courseModel } = require('../db');

const courseRouter = Router();

courseRouter.post('/purchase-course', async function (req, res) {
    res.json({
        msg: 'hit /course/purchase-course'
    });

});
courseRouter.get('/all-course', async function (req, res) {
    res.json({
        msg: 'hit /course/all-course'
    });
});

module.exports = {
    courseRouter: courseRouter
}