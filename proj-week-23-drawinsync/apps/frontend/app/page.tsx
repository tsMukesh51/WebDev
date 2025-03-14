import Image from "next/image";
import logo from "../../frontend/public/logo.png";
import Link from "next/link";
import UserProfile from "../icons/userProfile";
import { getServerSession } from "next-auth";


export default async function Page() {
  const secret = process.env.NEXTAUTH_SECRET;
  const session = await getServerSession();
  console.log(JSON.stringify(session));
  // console.log((await req));
  // const token = await getToken({ req, secret }) // get JWT token from request
  // console.log('token ' + token);
  // const session = await getSession({ req }) // check if session exists
  //   const response = await fetch(`${process.env.HTTP_SERVER_URL}/board/my-boards`, {
  //     method: "GET",
  //     headers: { "Content-Type": "application/json", "Authorization": token}
  // });
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
      <section>
        {session &&
          <div>
            <h1>User Profile</h1>
            <p>Username: {session.user?.userName}</p>
            <p>Email: {session.user?.email}</p>
            <p>User ID: {session.user?.id}</p>
            <p>Token: {session.user?.token}</p>
          </div>
        }
      </section>
    </main>
  );
}
