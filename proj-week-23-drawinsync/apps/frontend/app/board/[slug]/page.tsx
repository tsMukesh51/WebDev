import { getServerSession } from "next-auth";
import { authOptions } from "../../../lib/auth";
import Link from "next/link";
import { DrawBoard } from "../../../components/drawBoard";
import { ClientComp } from "../../../components/clientcomp";

export default async function boardView({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const session = await getServerSession(authOptions);
    if (session == null) {
        return <div>
            <p>Please Login</p>
            <Link href={"/api/auth/signin"} />
        </div>
    }
    const token = session.user?.token || "";
    const boardRes = await fetch(`${process.env.HTTP_SERVER_URL}/board/slug-board-id/${slug}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": token }
    });

    if (boardRes.status != 200) {
        console.log(boardRes);
        return <div>
            <p>Error while resolving slug, may be session expired please try logging again</p>
            <Link href={"/api/auth/signin"} />
        </div>
    }

    const boardData = await boardRes.json();
    const boardDetailsRes = await fetch(`${process.env.HTTP_SERVER_URL}/board/id-board-details/${boardData.board.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": token }
    });
    if (boardDetailsRes.status != 200) {
        console.log(boardDetailsRes);
        return <div>
            <p>Error while getting board data, may be session expired please try logging again</p>
            <Link href={"/api/auth/signin"} />
        </div>
    }

    const boardDetails = await boardDetailsRes.json();

    const elementsRes = await fetch(`${process.env.HTTP_SERVER_URL}/board/elements/${boardDetails.board.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": token }
    });
    if (elementsRes.status != 200) {
        console.log(boardRes);
        return <div>
            <p>Error while getting elements data, may be session expired please try logging again</p>
            <Link href={"/api/auth/signin"} />
        </div>
    }

    const elements = await elementsRes.json();



    return <div>
        <ClientComp>

            <DrawBoard elements={elements} collaborators={boardDetails.collaborators} board={boardDetails.board} />
        </ClientComp>
    </div>
}