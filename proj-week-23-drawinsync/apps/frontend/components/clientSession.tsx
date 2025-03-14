"use client"

import { useSession } from "next-auth/react"

export function ClientSession() {
    const session = useSession();
    console.log(session);
    if (session)
        return <div>logged in</div>
    return <div>not logged in</div>
}