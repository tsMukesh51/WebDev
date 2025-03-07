import Image from "next/image";
import logo from "../../frontend/public/logo.png";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import UserProfile from "../icons/userProfile";

export default function Page() {
  const session = useSession();
  return (
    <main className="min-h-screen p-2">
      <header className="flex justify-between w-full">
        <div className="flex items-center">
          <Image src={logo} alt="logo" className="size-9 lg:size-18 mx-2" />
          <p className="text-2xl lg:text-3xl">DrawInSync</p>
        </div>
        {session.status == "unauthenticated" ?
          <div className="text-2xl text-white flex flex-row items-center justify-around">
            <Link href={"/signup"}>Sign Up</Link>
            <Link href={"/signin"}>Login</Link>
          </div> :
          <button>
            <div className="w-2 h-2 bg-blue-600">
              <UserProfile />
            </div>
          </button>}

      </header>
      <section></section>
    </main>
  );
}
