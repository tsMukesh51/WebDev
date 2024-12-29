const { Router } = require('express');

const { courseModel, adminModel, userModel, purchaseModel } = require('../db');
const { userAuth } = require('../middleware/userAuth');

const courseRouter = Router();

courseRouter.post('/purchase-course', userAuth, async function (req, res) {
    try {
        const purchasedMN = await purchaseModel.findOne({
            userId: req.body.user._id,
            courseId: req.body.course.id
        });
        if (!purchasedMN) {
            const purchaseMN = await purchaseModel.create({
                userId: req.body.user._id,
                courseId: req.body.course.id
            });
            res.json({
                msg: 'Course purchased',
                purchaseId: purchaseMN._id
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Something went wrong'
        });
    }
});

courseRouter.get('/all-course', async function (req, res) {
    let allCourses = [];
    try {
        const coursesMN = await courseModel.find({});
        const adminMN = await adminModel.find({
            _id: {
                $in: coursesMN.map((course) => {
                    return course.courseAdmin;
                })
            }
        });
        coursesMN.forEach((course) => {
            let row = {};
            const courseAdmin = adminMN.find((admin) => {
                return admin._id.toString() === course.courseAdmin.toString();
            });
            row['id'] = course._id;
            row['courseName'] = course.courseName;
            row['price'] = course.price;
            row['thumbnailUrl'] = course.thumbnailUrl;
            row['description'] = course.description;
            row['courseCreator'] = courseAdmin.firstName;
            allCourses.push(row);
        });

        res.json({
            msg: 'List of All courses',
            courseList: allCourses
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