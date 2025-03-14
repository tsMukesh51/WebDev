"use client"

import { SessionProvider } from "next-auth/react";
import { JSX } from "react";

export function ClientComp({ children }: { children: JSX.Element }) {
    return <SessionProvider>{children}</SessionProvider>
}