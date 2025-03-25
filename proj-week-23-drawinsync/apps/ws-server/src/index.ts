import { WebSocket, WebSocketServer } from "ws";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Prisma } from "@repo/db/client";

const connectedOnes: Record<string, WebSocket[]> = {};
interface Connecson {
    boardId: string,
    collaboratorId: string,
    collaboratorType: 'EDITOR' | 'VIEWER'
}

interface PushMsg {
    msgType: 'SHAPE' | 'COLLABORATOR',
    eleType: 'ADD' | 'UPDATE' | 'DELETE',
    element: Partial<Prisma.Element> & { localId: string }
}

dotenv.config();
const wss = new WebSocketServer({ port: 8080 });
console.log("listening at 8080");

wss.on('connection', (ws, req) => {
    const params = new URLSearchParams(req.url?.split('?')[1]);
    const token = params.get('token');
    // console.log(token);
    if (!token) {
        ws.send('token absent');
        ws.close();
        return;
    }
    let connecson: Connecson;
    try {
        // @ts-ignore
        const jwtDecoded = jwt.verify(token, process.env.WS_JWT_SECRET!);
        if (typeof jwtDecoded == 'string') {
            ws.send('wrong payload');
            ws.close();
            return;
        }
        connecson = jwtDecoded as Connecson;
    } catch {
        ws.send('unauthorized');
        ws.close();
        return;
    }
    console.log(connecson);
    ws.send('connected');
    if (!connectedOnes[connecson.boardId]) {
        connectedOnes[connecson.boardId] = [];
    }
    connectedOnes[connecson.boardId]?.push(ws);
    console.log(connectedOnes);
    ws.on('message', (data) => {
        const msg: PushMsg = JSON.parse(data.toString());
        console.log(msg);
        if (msg.msgType == 'SHAPE') {
            if (msg.eleType == "ADD") {
                // upload to database
            }
            // update database
            connectedOnes[connecson.boardId]?.forEach((ws) => {
                // use the element id from db
                ws.send(JSON.stringify(msg));
            });
        }
    })
});
