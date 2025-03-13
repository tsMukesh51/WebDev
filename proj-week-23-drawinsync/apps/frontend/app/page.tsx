import Image from "next/image";
import logo from "../../frontend/public/logo.png";
import Link from "next/link";
import UserProfile from "../icons/userProfile";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();
  console.log(JSON.stringify(session));
  return (
    <main className="min-h-screen p-2">
      <header className="flex justify-between w-full">
        <div className="flex items-center">
          <Image src={logo} alt="logo" className="size-9 lg:size-18 mx-2" />
          <Link href={"/"} className="text-2xl lg:text-3xl">DrawInSync</Link>
        </div>
        {session?.user == null ?
          <div className="text-2xl text-white flex flex-row items-center justify-around">
            <Link href={"/signin"} className={"p-2 px-4 bg-blue-400 rounded-md"}>Login</Link>
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
