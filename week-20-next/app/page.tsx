// "use client"

import { getServerSession } from "next-auth";
import {getSession, SessionProvider, signIn, signOut, useSession} from "next-auth/react";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession();
  console.log(session);
  return (
    // <SessionProvider>
    <div className="flex items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <p>{JSON.stringify(session)}</p>
    </div>
    // </SessionProvider>
  );
}

// function OtherHome() {
//   const session = useSession();
//   return <>
//   <h1>Hi there</h1>
//   {console.log(session)}
//   {session.status == "authenticated" ? <button onClick={() => signOut()}>Sign Out</button> : <button onClick={() => signIn()}>Sign In</button>}
//   </>
// }