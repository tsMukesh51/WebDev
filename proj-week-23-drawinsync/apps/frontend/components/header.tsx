import Image from "next/image";
import logo from "../../frontend/public/logo.png";
import Link from "next/link";
import UserProfileIcon from "../icons/userProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export default async function Header() {
    const session = await getServerSession(authOptions);

    return <header className="flex justify-between w-full">
        <div className="flex items-center">
            <Image src={logo} alt="logo" className="size-9 lg:size-18 mx-2" />
            <Link href={"/"} className="text-2xl lg:text-3xl">DrawInSync</Link>
        </div>
        {session?.user == null ?
            <div className="text-2xl text-white flex flex-row items-center justify-around">
                <Link href={"/api/auth/signin"} className={"p-2 px-4 bg-blue-400 rounded-md"}>Login</Link>
            </div> :
            <button>
                <div className="w-2 h-2 bg-blue-600">
                    <UserProfileIcon />
                </div>
            </button>}
    </header>
}