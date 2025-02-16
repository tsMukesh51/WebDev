import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws, request) => {
    if (!request) {
        ws.close();
        return;
    }
    const params = new URLSearchParams(request.url);
    const token = params.get('token');
    if (!token) {
        ws.send("unauthorized");
        ws.close();
        return;
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded) {
        ws.send("unauthorized");
        ws.close();
        return;
    }
    ws.send('connected');
    ws.on('message', (data) => {
        console.log(data);
        if (data.toString() == "ping")
            ws.send('pong');
    });
});