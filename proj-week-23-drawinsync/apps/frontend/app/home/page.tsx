import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import { redirect } from "next/navigation";
import { Board, IBoard } from "../../components/board";
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
    const userBoards = await fetch(`${process.env.HTTP_SERVER_URL}/board/my-boards`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": token }
    });

    if (userBoards.status != 200) {
        console.log(userBoards);
        return <div>
            <p>Error, may be session expired please try logging again</p>
            <Link href={"/api/auth/signin"} />
        </div>
    }

    const userBoardsData = await userBoards.json();
    console.log(JSON.stringify(userBoardsData));
    return <main>
        <p className="text-3xl">Your Boards</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {userBoardsData.ownedBoardList.map((board: IBoard) => {
                return <Board key={board.id} board={board} />
            })}
        </div>
        <p className="text-3xl">Shared Boards with You</p>
        {userBoardsData.sharedBoardList.map((board: IBoard) => {
            return <Board key={board.id} board={board} />
        })}
    </main>
}