"use client";

import { useEffect, useRef, useState } from "react";
import { ShapeOptions } from "./shapeOptions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Session } from "next-auth";
import { Drawer } from "../lib/drawer";
import { Prisma } from "@repo/db/client";

export interface IDrawBoard {
    elements: Element[],
    collaborators: Prisma.BoardCollaborator[],
    board: Prisma.Board,
    session: Session;
}

export function DrawBoard({ elements, collaborators, board, session }: IDrawBoard) {
    const socket = new WebSocket('ws://localhost:8080');
    const [authed, setAuthed] = useState(false);
    const [selectedShape, setSelectedShape] = useState<Prisma.ShapeType>(Prisma.ShapeType.RECTANGLE);
    const wsToken = useRef<string>("");
    const token = session.user?.token || "";
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // @ts-ignore
    const drawer = useRef<Drawer>(null);


    const connectWS = () => {
        fetch(`http://localhost:3000/board/get-token/${board.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": token }
        }).then((res) => {
            if (res.ok)
                return res.json();
            console.log('error getting ws-token' + JSON.stringify(res));
        }).then((data) => {
            wsToken.current = data.wsToken;
            // setAuthed(true);
        });
        socket.onopen = function () {
            setAuthed(true);
        };
    }

    useEffect(() => {
        connectWS();
        return () => {
            if (socket.OPEN)
                socket.close();
        }
    }, []);

    useEffect(() => {
        if (authed && socket.OPEN && canvasRef.current) {
            drawer.current = new Drawer({ canvas: canvasRef.current, elements, socket, board });
            canvasRef.current?.classList.remove('hidden');
        }
    }, [authed]);

    useEffect(() => {
        console.log(drawer); // null
        if (drawer.current) {
            console.log(selectedShape);
            drawer.current.selectShape(selectedShape);
        }
    }, [selectedShape])

    return <div className="z-[0]">
        <ShapeOptions selectedShape={selectedShape} setSelectedShape={setSelectedShape}></ShapeOptions>
        {authed ?
            <canvas ref={canvasRef} width={1280} height={720} className="bg-slate-950 hidden z-[1]"></canvas> :
            <p className="z-[1]">connecting</p>}
    </div>
}