import { getServerSession } from "next-auth";
import { authOptions } from "../../../../lib/auth";
import Link from "next/link";
import { DrawBoard } from "../../../../components/drawBoard";
import { ClientComp } from "../../../../components/clientcomp";

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
    const slugBoardIdRes = await fetch(`${process.env.HTTP_SERVER_URL}/board/slug-board-id/${slug}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": token }
    });

    const slugBoardIdData = await slugBoardIdRes.json();
    if (slugBoardIdRes.status != 200) {
        console.log(slugBoardIdRes.status);
        console.log(slugBoardIdData);
        return <div>
            <p>Error: {slugBoardIdData.message}</p>
            <Link href={"/api/auth/signin"} />
        </div>
    }

    const idBoardDetailsRes = await fetch(`${process.env.HTTP_SERVER_URL}/board/id-board-details/${slugBoardIdData.board.id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json", "Authorization": token }
    });
    const idBoardDetailsData = await idBoardDetailsRes.json();
    if (idBoardDetailsRes.status != 200) {
        console.log(idBoardDetailsRes);
        console.log(idBoardDetailsData);
        return <div>
            <p>Error: {idBoardDetailsData.message}</p>
            <Link href={"/api/auth/signin"} />
        </div>
    }

    return <div>
        <ClientComp>
            <DrawBoard collaborators={idBoardDetailsData.collaborators} board={idBoardDetailsData.board} session={session} />
        </ClientComp>
    </div>
}