
import { getServerSession } from "next-auth";
import { ClientComp } from "../components/clientcomp";
import { ClientSession } from "../components/clientSession"
import { authOptions } from "../lib/auth";
import Header from "../components/header";
import { redirect } from "next/navigation";
import UserProfileIcon from "../icons/userProfile";
import Link from "next/link";
import logo from "../../frontend/public/logo.png";
import Image from "next/image";

export default async function Page() {
  const secret = process.env.NEXTAUTH_SECRET;
  const session = await getServerSession(authOptions);
  console.log(`serses ${JSON.stringify(session)}`);
  // console.log((await req));
  // const token = await getToken({ req, secret }) // get JWT token from request
  // console.log('token ' + token);
  // const session = await getSession({ req }) // check if session exists
  //   const response = await fetch(`${process.env.HTTP_SERVER_URL}/board/my-boards`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json", "Authorization": token}
  // });
  if (session?.user != null) {
    redirect('/home');
  }
  return (
    <main className="min-h-screen">

      <section className="h-screen w-screen flex justify-center items-center">
        <div className="">
          <p className="text-6xl">Welcome to DrawInSync</p>
          <p>start by creating an account</p>
        </div>
      </section>
    </main>
  );
}
