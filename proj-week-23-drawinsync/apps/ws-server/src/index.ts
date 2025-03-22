import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
console.log("listening at 8080");

wss.on('connection', (ws, req) => {

});
