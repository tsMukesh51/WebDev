import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import { redirect } from "next/navigation";
import { Board, IBoard } from "../../../components/board";
import Link from "next/link";

export default async function Home() {
    if (!process.env.HTTP_SERVER_URL)
        throw new Error("enviroment not defined");
    const session = await getServerSession(authOptions);
    if (session == null) {
        return <div>
            <p>Please Login</p>
            <Link href={"/api/auth/signin"} />
        </div>
    }
    const token = session.user?.token || "";
    const myBoardsRes = await fetch(`${process.env.HTTP_SERVER_URL}/board/my-boards`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": token }
    });

    const myBoardsData = await myBoardsRes.json();
    if (myBoardsRes.status != 200) {
        console.log(myBoardsRes.status);
        console.log(myBoardsData);
        return <div>
            <p>Error: {myBoardsData.message}</p>
            <Link href={"/api/auth/signin"} >Login</Link>
        </div>
    }

    return <main>
        <p className="text-3xl">Your Boards</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {myBoardsData.ownedBoardList.map((board: IBoard) => {
                return <Board key={board.id} board={board} />
            })}
        </div>
        <p className="text-3xl">Shared Boards with You</p>
        {myBoardsData.sharedBoardList.map((board: IBoard) => {
            return <Board key={board.id} board={board} />
        })}
    </main>
}