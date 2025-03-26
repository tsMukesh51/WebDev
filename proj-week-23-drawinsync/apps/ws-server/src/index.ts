import { WebSocket, WebSocketServer } from "ws";
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Prisma, prismaClient } from "@repo/db/client";

const connectedOnes: Record<string, WebSocketEx[]> = {};
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

interface WebSocketEx extends WebSocket {
    boardId?: string
}

const wss = new WebSocketServer({ port: 8080 });

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
    setInterval(() => {
        Object.keys(connectedOnes).forEach((boardId) => {
            connectedOnes[boardId]?.forEach((client, index) => {
                if (client.readyState === WebSocket.CLOSED) {
                    connectedOnes[boardId]?.splice(index, 1);
                } else {
                    client.ping();
                }
            });
        });
    }, 30000);
    ws.on('message', (data) => {
        const msg: PushMsg = JSON.parse(data.toString());
        console.log(msg);
        if (msg.msgType == 'SHAPE') {
            if (msg.eleType == "ADD") {
                prismaClient.element
            }
            // update database
            connectedOnes[connecson.boardId]?.forEach((ws) => {
                // use the element id from db
                ws.send(JSON.stringify(msg));
            });
        }
    });
    ws.on('close', () => {
        Object.keys(connectedOnes).forEach((boardId, index) => {
            connectedOnes[boardId]?.filter((clientWs) => {
                return clientWs !== ws;
            });
            if (connectedOnes[boardId]?.length === 0) {
                delete connectedOnes[boardId];
            }
        })
    });
});

async function main() {
    dotenv.config();
    try {
        await prismaClient.$connect();
        console.log("listening at 8080");
    } catch (err) {
        wss.close();
        console.log('failed to connect prisma ' + err);
    }
}