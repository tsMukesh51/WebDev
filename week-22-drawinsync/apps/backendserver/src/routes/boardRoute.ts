import Express from "express";
import { prisma } from "@repo/db";
import { CreateBoard } from "@repo/common";

const boardRoute = Express.Router();

boardRoute.post('/create', (req, res) => {
    const { success, data, error } = CreateBoard.safeParse(req.body);
    if (!success)
        res.json({
            message: "invalid format",
            data: null,
            error: error.issues
        })
    if (success)
        prisma.board.create({
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
});

export { boardRoute };