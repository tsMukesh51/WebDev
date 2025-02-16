import Express from "express";
import { prisma } from "@repo/db";

const boardRoute = Express.Router();

boardRoute.post('/create', (req, res) => {
    prisma.board.create({
        data: {
            boardName: 'dsa logic',
            slug: 'dsa-logic',
            isPublic: false,
            adminId: "550e8400-e29b-41d4-a716-446655440000"
        }
    })
    res.json({
        message: 'Room created'
    })
});

export { boardRoute };