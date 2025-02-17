import Express from "express";
import { prisma } from "@repo/db";
import { CreateBoard } from "@repo/common";
import { userAuth } from "../auth/userAuth";

const boardRoute = Express.Router();

boardRoute.post('/create', userAuth, async (req, res) => {
    const { success, data, error } = CreateBoard.safeParse(req.body);
    if (!success) {
        res.json({
            message: "invalid format",
            data: null,
            error: error.issues
        })
        return;
    }
    try {
        await prisma.board.create({
            data: {
                boardName: req.body.boardName,
                slug: req.body.slug,
                isPublic: false,
                adminId: req.userId
            }
        })
        res.json({
            message: 'board created'
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            message: 'Something went wrong'
        })
    }
});

export { boardRoute };