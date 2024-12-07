const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();

const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String
});

const adminSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String
});

const courseSchema = new Schema({
    courseName: String,
    price: Number,
    thumbnailUrl: String,
    description: String,
    courseAdmin: {
        type: Schema.Types.ObjectId,
        ref: 'admin'
    }
})

const purchaseSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'courses'
    },
})

const userModel = mongoose.model('users', userSchema);
const adminModel = mongoose.model('admin', adminSchema);
const courseModel = mongoose.model('courses', courseSchema);
const purchaseModel = mongoose.model('purchases', purchaseSchema);

module.exports = {
    userModel,
    adminModel,
    courseModel,
    purchaseModel
};