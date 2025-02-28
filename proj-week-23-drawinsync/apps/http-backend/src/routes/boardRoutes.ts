import { Router } from "express";
import { userAuth } from "../middlewares/auth";
import { prisma } from "@repo/db";

const boardRoute = Router();

boardRoute.get('/', userAuth, async (req, res) => {
    try {
        const userBoards = await prisma.board.findMany(
            {
                where:
                {
                    BoardAdmins: {
                        some: {
                            adminId: req.userId
                        }
                    }
                }
            });
        res.json({
            message: "List of available boards",
            boardList: userBoards
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "DB error while getting boards"
        });
        return;
    }
});

boardRoute.post('/create', userAuth, async (req, res) => {
    const newBoard = await prisma.board.create({
        data: {
            boardName: req.body.boardName,
            slug: req.body.slug,
            BoardAdmins: {
                create: [
                    {
                        adminId: req.userId,
                    }
                ]
            }
        }
    });
    res.json({
        message: "New Board Created",
        Board: newBoard
    });
    return;
})

export { boardRoute }