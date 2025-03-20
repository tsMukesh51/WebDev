"use client";

import { useEffect, useState } from "react";
import { ShapeOptions } from "./shapeOptions";
import { useSession } from "next-auth/react";
import Link from "next/link";

export interface IDrawBoard {
    elements: any[],
    collaborators: any[],
    board: any
}

export function DrawBoard({ elements, collaborators, board }: IDrawBoard) {
    const [authed, setAuthed] = useState(false);
    const [shapeOp, setShapeOp] = useState('rect');
    let wsToken = '';
    const { data: session, status } = useSession();

    const getToken = () => {
        console.log(board.id);
        fetch(`http://localhost:3000/board/get-token/${board.id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json", "Authorization": token }
        }).then((res) => {
            if (res.ok)
                return res.json();
            console.log('error getting ws-token' + JSON.stringify(res));
        }).then((data) => {
            wsToken = data.wsToken;
            setAuthed(true);
        });
    }

    useEffect(() => {
        if (status != "authenticated" || session == null)
            return;
        getToken();
    }, [session]);


    if (status != "authenticated" || session == null) {
        console.log(session);
        return <>
            <p>Error while getting session data, may be session expired please try logging again</p>
            <Link href={"/api/auth/signin"} />
        </>
    }
    const token = session.user?.token || "";

    return <div className="">
        <ShapeOptions shapeOpProp={shapeOp} setShapeOpProp={setShapeOp}></ShapeOptions>
        {authed ? "canvas" : <p>connecting</p>}
    </div>
}