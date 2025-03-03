import { NextFunction, Router } from "express";
import { something, userAuth } from "../middlewares/auth";
import { prisma } from "@repo/db";
import { CreateBoard, UpdateCollaborator } from "@repo/lib/types";
import jwt from "jsonwebtoken";

const boardRoute = Router();
// boardRoute.use(something);
boardRoute.use(userAuth);

boardRoute.get('/my-boards', async (req, res) => {
    try {
        const userBoards = await prisma.board.findMany(
            {
                where: {
                    ownerId: req.userId
                }
            });
        res.json({
            message: "List of your boards",
            boardList: userBoards
        });
        return;
    } catch (err) {
        console.log(JSON.stringify(err));;
        res.status(500).json({
            message: "DB error while getting boards"
        });
        return;
    }
});

boardRoute.get('/shared-we-me', async (req, res) => {
    try {
        const userBoards = await prisma.board.findMany(
            {
                where: {
                    NOT: {
                        ownerId: req.userId,
                    },
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
    } catch (err: any) {
        console.log(JSON.stringify(err));;
        res.status(500).json({
            message: "DB error while getting boards"
        });
        return;
    }
});

boardRoute.post('/create', async (req, res) => {
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
                boardName: data.boardName,
                slug: data.slug,
                ownerId: req.userId,
                BoardCollaborators: {
                    create: {
                        collaboratorId: req.userId
                    }
                }
            },
        });

        res.json({
            message: "New Board Created",
            Board: newBoard
        });
        return;
    } catch (err: any) {
        console.log(JSON.stringify(err));
        if (err.name == "PrismaClientKnownRequestError" && err.code == "P2002") {
            res.status(409).json({
                message: "Board with slug already exists",
                slug: data.slug
            });
            return;
        }
        res.status(500).json({
            message: "DB error while creating board"
        });
    }
});

boardRoute.post('/update-collaborator', async (req, res) => {
    const { success, data, error } = UpdateCollaborator.safeParse(req.body);
    if (!success) {
        res.status(400).json({
            message: "Invalid Format",
            error: error.issues
        });
        return;
    }

    try {
        const dbCollaboratorId = await prisma.user.findFirst({
            where: {
                userName: data.userName
            }
        });
        if (!dbCollaboratorId) {
            res.status(404).json({
                message: "User not found",
                userName: data.userName
            });
            return;
        }
        const dbBoard = await prisma.board.findFirst({
            where: {
                id: data.boardId
            }
        });

        if (!dbBoard) {
            res.status(404).json({
                message: "Board not found",
                userName: data.boardId
            });
            return;
        }
        if (dbBoard.ownerId === dbCollaboratorId.id) {
            res.status(403).json({
                message: "You are owner of the board"
            });
            return;
        }
        const updateCollaborator = await prisma.boardCollaborator.upsert({
            where: {
                collaboratorId_boardId: {
                    collaboratorId: dbCollaboratorId.id,
                    boardId: data.boardId
                },
            },
            update: {
                collaboratorType: data.collboratorType
            },
            create: {
                collaboratorId: dbCollaboratorId.id,
                boardId: data.boardId,
                collaboratorType: data.collboratorType
            }
        });
        res.json({
            message: "User permission updated",
            currentStatus: updateCollaborator.collaboratorType,
            id: updateCollaborator,
        });
        return;
    } catch (err) {
        console.log(JSON.stringify(err));;
        res.status(500).json({
            message: "Error updating collabotor"
        });
        return;
    }
});


boardRoute.get('/get-token/:boardId', async (req, res) => {
    if (!req.params.boardId) {
        res.status(400).json({
            message: "BoardId is missing"
        });
        return;
    }// transform to isOnwer, collaboratorType json and send.
    try {
        const board = await prisma.board.findFirst({
            where: {
                id: req.params.boardId,
                BoardCollaborators: {
                    some: {
                        collaboratorId: req.userId,
                    },

                },
            },
            select: {
                id: true,
                boardName: true,
                slug: true,
                BoardCollaborators: {
                    where: {
                        collaboratorId: req.userId
                    }
                }
            }
        });
        if (!board) {
            res.status(404).json({
                message: "Board not found or not accessible to you"
            });
            return;
        }
        const wsToken = jwt.sign(board, process.env.WS_JWT_SECRET!, { expiresIn: '1d' });
        res.json({
            message: "Websocket token generated successfully",
            wsToken: wsToken
        });
        return;
    } catch (err) {
        res.status(500).json({
            message: "Something went wrong while getting board access"
        });
        return;
    }
});

boardRoute.get('/slug-board/:slug', async (req, res) => {
    const { success, data, error } = CreateBoard.pick({ slug: true }).safeParse(req.params);
    if (!success) {
        res.status(400).json({
            message: "Invalid Board slug",
            error: error.issues
        });
        return;
    }// add the collaborator permissions also
    try {
        const dbBoard = await prisma.board.findFirst({
            where: {
                slug: data.slug
            }
        });
        if (dbBoard) {
            res.json({
                message: "BoardId for given slug found",
                slug: data.slug,
                board: dbBoard
            });
            return;
        }
        res.status(404).json({
            message: "BoardId for given slug not found",
            slug: data.slug
        });
        return;
    } catch (err) {
        console.log(JSON.stringify(err));
        res.status(500).json({
            message: "Error while getting Id from slug"
        });
        return;
    }

})

export { boardRoute }