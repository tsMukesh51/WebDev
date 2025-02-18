import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

// interface Connection {
//     roomId: string,
//     subscribers: string[]
// }

interface wsMessageType {
    msgType: 'join' | 'leave' | 'draw',
    boardId: string,
    msg: any
}

const connections: Record<string, WebSocket[]> = {};

wss.on('connection', (ws: WebSocket, request) => {
    if (!request) {
        ws.close();
        return;
    }
    const params = new URLSearchParams(request.url?.split('?')[1]);
    const token = params.get('token')?.split(' ')[1];
    if (!token) {
        ws.send("unauthorized");
        ws.close();
        return;
    }
    let decoded = null;
    try {
        decoded = jwt.verify(token, JWT_SECRET);
    } catch (err) {
        ws.send("unauthorized");
        ws.close();
        return;
    }
    const userId = !decoded ? "" : typeof decoded != "string" ? decoded.userId : "";
    ws.send('connected');
    ws.on('message', (data) => {
        const wsMessage: wsMessageType = JSON.parse(data.toString());
        const boardId = wsMessage.boardId;

        if (!boardId) {  // Fix 2: Simplified null/undefined check
            ws.send('Invalid boardId');
            return;
        }

        if (!connections[boardId]) {
            connections[boardId] = [];
        }

        // Fix 3: Avoid duplicate WebSockets
        if (!connections[boardId].includes(ws)) {
            connections[boardId].push(ws);
        }
        if (wsMessage.msgType == 'draw') {

        }
        ws.send('pong');
    });
});