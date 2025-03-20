import { ExternalLinkIcon } from "../icons/externalLink"

export interface IBoard {
    id: string,
    boardName: string,
    slug: string,
    ownerId: string
    BoardCollaborators: any[]
}

export function Board({ board }: { board: IBoard }) {
    return <div id={board.id} className="bg-black rounded p-3">
        <p className="text-2xl">{board.boardName}</p>
        <a href={`/board/${board.slug}`} className="flex items-center gap-1">
            <p className="text-blue-500">{board.slug}</p>
            <ExternalLinkIcon className={"size-4 fill-blue-500"} />
        </a>
        <div>
            {board.BoardCollaborators.map((collaborator) => {
                return <p key={collaborator.collaboratorId}>{collaborator.collaboratorId}</p>;
            })}
        </div>
    </div>
}