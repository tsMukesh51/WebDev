import express from "express";
import { json } from "express";
import { CorsOptions } from "cors";
import cors from "cors";
import { connect, isValidObjectId } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

import { contentSchema, userSchema } from "./types/schema";
import { ContentModel, UserModel } from "./db";
import { userAuth } from "./middleware/user";
import { decryptUserId, encryptUserId } from "./Utils/cipher";

const app = express();
app.use(json());
app.use(cors());
dotenv.config();

app.post("/api/v1/signup", async (req, res) => {
    const { success, data, error } = userSchema.omit({ isShared: true }).safeParse(req.body);
    if (!success) {
        res.status(400).json({
            msg: 'Invalid Format',
            err: error.errors
        })
        return;
    }
    try {
        const createdUser = await UserModel.create({ ...req.body, isShared: false });
        res.json({
            msg: 'Account created'
        });
    } catch (err: any) {
        if (err.code == '11000') {
            res.status(409).json({
                msg: 'Account already exists'
            });
        }
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});

app.post("/api/v1/signin", async (req, res) => {
    const { success, data, error } = userSchema.pick({
        username: true,
        password: true,
    }).safeParse(req.body);
    if (!success) {
        res.status(400).json({
            msg: 'Invalid Format',
            err: error.issues
        })
        return;
    }
    try {
        const currentUser = await UserModel.findOne({ username: req.body.username });
        if (currentUser) {
            if (currentUser.password === req.body.password) {
                if (process.env.JWT_SECRET) {
                    const jwttoken = jwt.sign({ id: currentUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
                    res.json({
                        msg: 'Login Successful',
                        token: `Bearer ${jwttoken}`
                    });
                } else {
                    res.status(500).json({
                        msg: 'Internal Server Error'
                    })
                }
            } else {
                res.status(401).json({
                    msg: 'Wrong Credentials'
                });
            }
        } else {
            res.status(404).json({
                msg: 'Account does not exists'
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});

app.get("/api/v1/content", userAuth, async (req, res) => {
    try {
        const contents = await ContentModel.find({
            userId: req.userId
        }).populate('authorName', 'fullName -_id');
        res.status(200).json({
            msg: 'List of Contents',
            contents: contents
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});

app.post("/api/v1/content", userAuth, async (req, res) => {
    const { success, data, error } = contentSchema.safeParse({ ...req.body, userId: req.userId });
    if (!success) {
        res.status(400).json({
            msg: "Invalid format",
            Error: error.errors
        });
        return;
    }
    try {
        const content = await ContentModel.create({
            contentFormat: req.body.contentFormat,
            body: req.body.body,
            title: req.body.title,
            createdAt: new Date(),
            userId: req.userId
        });
        console.log(content);
        const data = content.populate('authorName', 'fullName -_id');
        console.log(data);
        res.status(200).json({
            msg: 'Content Created',
            content: data
        });
    } catch (err: any) {
        console.log(err);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});

app.delete("/api/v1/content/:contentId", userAuth, async (req, res) => {
    if (!isValidObjectId(req.params.contentId)) {
        res.status(400).json({
            msg: 'Invalid content Id'
        });
    }
    try {
        const content = await ContentModel.deleteOne({
            _id: req.params.contentId,
            userId: req.userId
        });
        if (content.deletedCount >= 1) {
            res.status(200).json({
                msg: 'Content Deleted'
            });
        } else {
            res.status(404).json({
                msg: 'Content not found to delete'
            })
        }
    } catch (err: any) {
        console.log(err);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});

app.post("/api/v1/brain/share", userAuth, async (req, res) => {
    if (typeof req.body.isShared == 'undefined' || req.body.isShared == null) {
        res.status(400).json({
            msg: 'Sharing status not specified'
        });
        return;
    }
    if (!req.userId) {
        res.status(500).json({
            msg: 'Internal Server Error, user not found'
        })
        return;
    }
    try {
        const updateShared = await UserModel.updateOne({ _id: req.userId }, {
            isShared: req.body.isShared
        });
        if (req.body.isShared) {
            const sharedLink = encryptUserId(req.userId);
            res.status(200).json({
                msg: 'Share link created successfully',
                sharedLink: sharedLink
            });
            return;
        } else {
            res.status(200).json({
                msg: 'Share link disabled'
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }
});

app.get("/api/v1/brain/share", userAuth, async (req, res) => {
    if (!req.userId) {
        res.status(500).json({
            msg: 'Internal Server Error, user not found'
        })
        return;
    }
    try {
        const updateShared = await UserModel.findOne({ _id: req.userId });
        if (!updateShared) {
            console.log("user not found");
            res.status(500).json({
                msg: 'Internal Server Error'
            });
            return;
        }
        if (updateShared.isShared) {
            const sharedLink = encryptUserId(req.userId);
            res.status(200).json({
                msg: 'Share link created successfully',
                sharedLink: sharedLink
            });
            return;
        } else {
            res.status(200).json({
                msg: 'Share link disabled'
            })
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Internal Server Error'
        })
    }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
    if (req.params.shareLink.length != 64) {
        res.status(400).json({
            msg: 'User not found'
        });
        return;
    }
    const userId = decryptUserId(req.params.shareLink);
    if (userId === 'undefined' || userId === null) {
        res.status(400).json({
            msg: 'User not found'
        });
        return;
    }
    try {
        const user = await UserModel.findOne({
            _id: userId
        });
        if (user?.isShared == false) {
            res.status(401).json({
                msg: 'User brain is private'
            });
            return;
        }
        const contents = await ContentModel.find({
            userId: userId,
        });
        res.json({
            msg: 'List of Contents',
            contents: contents
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
});

// app.get("/api/v1/tweet/:user/:tweetId", async (req, res) => {
//     if (req.params.user == null || req.params.user == "") {
//         res.status(411).json({
//             msg: 'user missing is url'
//         });
//         return;
//     }
//     if (req.params.tweetId == null || req.params.tweetId == "") {
//         res.status(411).json({
//             msg: 'tweetId missing is url'
//         });
//         return;
//     }

// })

const main = async (): Promise<any> => {
    if (!process.env.MONGO_URL) {
        console.log('Mongo Url not found');
        return;
    }
    connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log('Server Started');
}

main();