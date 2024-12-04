const { Router } = require('express');

const { courseModel, adminModel } = require('../db');

const courseRouter = Router();

courseRouter.post('/purchase-course', async function (req, res) {
    res.json({
        msg: 'hit /course/purchase-course'
    });

});

courseRouter.get('/all-course', function (req, res) {
    let allCourses = [];
    try {
        const coursesMN = courseModel.find({});
        adminModel.find({}).then((adminList) => {
            coursesMN.then((courseList) => {
                courseList.forEach((course) => {
                    let row = {};
                    const courseAdmin = adminList.find((admin) => {
                        return admin._id == course.courseAdmin
                    });
                    row[id] = course._id;
                    row[courseName] = course.courseName;
                    row[price] = course.price;
                    row[thumbnailUrl] = course.thumbnailUrl;
                    row[description] = course.description;
                    row[courseCreator] = courseAdmin.firstName;
                    allCourses.push(row);
                });

                res.json({
                    msg: 'List of All courses',
                    courseList: allCourses
                });
            });
        });
    } catch (err) {
        console.log(err);
        res.json({
            msg: 'Something went wrong'
        })
    }
});

module.exports = {
    courseRouter: courseRouter
}