import { Schema, Mongoose, ObjectId, model } from "mongoose";
import { contentType } from "./schema";
import { tuple } from "zod";



const userDbSchema = new Schema({
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const contentDbSchema = new Schema({
    type: { type: String, enum: contentType, required: true },
    body: { type: String, required: true },
    title: { type: String },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const tagDbSchema = new Schema({
    title: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, required: true }
});

const contentTagLinkDbSchema = new Schema({
    tagId: { type: Schema.Types.ObjectId, ref: 'Tag', required: true },
    contentId: { type: Schema.Types.ObjectId, ref: 'content', required: true }
});

export const userModel = model('User', userDbSchema);
export const ContentModel = model('Content', contentDbSchema);
export const TagModel = model('Tag', tagDbSchema);
export const ContentTagLinkModel = model('ContentTagLink', contentTagLinkDbSchema);