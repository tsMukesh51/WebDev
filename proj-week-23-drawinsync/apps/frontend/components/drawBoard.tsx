"use client";

import { useEffect, useRef, useState } from "react";
import { ShapeOptions } from "./shapeOptions";
import { Session } from "next-auth";
import { Drawer } from "../lib/drawer";
import { Prisma } from "@repo/db/client";

export interface IDrawBoard {
    collaborators: Prisma.BoardCollaborator[],
    board: Prisma.Board,
    session: Session;
}

export function DrawBoard({ collaborators, board, session }: IDrawBoard) {
    const [authed, setAuthed] = useState(false);
    const [selectedShape, setSelectedShape] = useState<Prisma.ShapeType>(Prisma.ShapeType.RECTANGLE);
    const wsToken = useRef<string>("");
    const token = session.user?.token || "";
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // @ts-ignore
    const drawer = useRef<Drawer>(null);
    const socket = useRef<WebSocket>(null);
    const retryCount = useRef(0);


    const getElements = () => {
        const elements = fetch(`${process.env.HTTP_SERVER_URL}/board/elements/${board.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": token }
        }).then((res) => {
            if (res.ok)
                return res.json();
            console.log(res);
        }).then((data) => {
            drawer.current?.loadOldElements(data.elements);
        }).catch((err) => {
            console.log(err);
        })
    }

    const connectWs = () => {
        socket.current = new WebSocket(`${process.env.WS_SERVER_URL}?token=${wsToken.current}`);
        socket.current.onopen = function () {
            setAuthed(true);
            retryCount.current = 0;
        };
        socket.current.onclose = (ev) => {
            retryCount.current++;
            setAuthed(false);
            if (retryCount.current == 0) {
                console.log('trying to connect');
                connectWs();
            } else if (retryCount.current < 75) {
                console.log('trying to connect');
                setTimeout(connectWs, 3000);
            } else {
                console.log('failed to connect to wss');
            }
        }
        socket.current.onerror = (ev) => {
            console.error("WebSocket error:", ev);
            socket.current?.close();
        }
    }

    const getToken = () => {
        fetch(`${process.env.HTTP_SERVER_URL}/board/get-token/${board.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": token }
        }).then((res) => {
            if (res.ok)
                return res.json();
            console.log('error getting ws-token' + JSON.stringify(res));
        }).then((data) => {
            wsToken.current = data.wsToken;
        });
    }

    const setUp = async () => {
        getToken();
        connectWs();
        getElements();
    }

    useEffect(() => {
        setUp();
        return () => {
            if (socket.current && socket.current.OPEN)
                socket.current.close();
        }
    }, []);

    // useEffect(() => {
    //     if (wsToken.current != "")
    //         connectWs();
    // }, [wsToken]);

    useEffect(() => {
        if (authed && socket.current && socket.current.OPEN && canvasRef.current) {
            drawer.current = new Drawer({ canvas: canvasRef.current, socket: socket.current, board, userId: session.user?.id });
            canvasRef.current?.classList.remove('hidden');
        }
    }, [authed]);

    useEffect(() => {
        if (drawer.current) {
            drawer.current.selectShape(selectedShape);
        }
    }, [selectedShape])

    return <div className="z-[0]">
        <ShapeOptions selectedShape={selectedShape} setSelectedShape={setSelectedShape}></ShapeOptions>
        {authed ?
            <canvas ref={canvasRef} width={3840} height={2160} className="bg-slate-950 hidden z-[1]"></canvas> :
            <p className="z-[1]">connecting</p>}
    </div>
}