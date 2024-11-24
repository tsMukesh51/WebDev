const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});

const todoSchema = new Schema({
    title: String,
    isCompleted: Boolean,
    userId: ObjectId
});

const userModel = mongoose.model("users", userSchema);
const todoModel = mongoose.model("todos", todoSchema);

module.exports = {
    userModel,
    todoModel
};