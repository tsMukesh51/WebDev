import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
    ws.on('message', (data) => {
        console.log(data);
        if (data.toString() == "ping")
            ws.send('pong');
    });
})