import { Router } from "express";
import { userAuth } from "../middlewares/auth";
import { prisma } from "@repo/db";
import { CreateBoard, UpdateCollaborator } from "@repo/lib/types";

const boardRoute = Router();

boardRoute.get('/my-boards', userAuth, async (req, res) => {
    try {
        const userBoards = await prisma.board.findMany(
            {
                where: {
                    onwerId: req.userId
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

boardRoute.get('/shared-we-me', userAuth, async (req, res) => {
    try {
        const userBoards = await prisma.board.findMany(
            {
                where: {
                    BoardCollaborators: {
                        some: {
                            collaboratorId: req.userId
                        }
                    }
                }
            });
        res.json({
            message: "List of boards shared with you",
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
    const { success, data, error } = CreateBoard.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: "Invalid format",
            error: error.issues
        });
        return;
    }
    try {
        const newBoard = await prisma.board.create({
            data: {
                boardName: req.body.boardName,
                slug: req.body.slug,
                onwerId: req.userId
            }
        });

        res.json({
            message: "New Board Created",
            Board: newBoard
        });
        return;
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "DB error while creating board"
        });
        return;
    }
});

boardRoute.post('/update-collaborator', userAuth, async (req, res) => {
    const { success, data, error } = UpdateCollaborator.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: "Invalid Format",
            error: error.issues
        })
    }
})

export { boardRoute }