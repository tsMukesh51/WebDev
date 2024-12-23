import { Dustbin } from "../assets/DustbinIcon";
import { ShareIcon } from "../assets/ShareIcon";
import { TextIcon } from "../assets/TextIcon";

interface CardProps {
    text: string;
}

const defaultStyles = "bg-white rounded-xl shadow-md border-slate-200 border-[1px] p-5 w-min flex flex-col gap-6"

export function Card({ text }: CardProps) {
    return <div className={defaultStyles}>
        <div className="flex items-center justify-between gap-3">
            <div className="shrink-0">
                <TextIcon></TextIcon>
            </div>
            <p className="grow text-2xl">Titlelkjdsafkl kljdfldskjaslj  jjdklfjkdsljflksjflksdjfskljlksf;js lkjdflks fdlkjfl</p>
            <div className="flex items-center gap-3 p-2 text-gray-500 shrink-0">
                <ShareIcon></ShareIcon>
                <Dustbin></Dustbin>
            </div>
        </div>
        <p>{text}</p>
        <div className="flex gap-2">
            <p className="bg-purple-250 text-purple-450 rounded-full w-min py-1 px-3 text-sm">#productivity</p>
            <p className="bg-purple-250 text-purple-450 rounded-full w-min py-1 px-3 text-sm">#ideas</p>
        </div>
        <p className="text-slate-400">Added on 10/03/2024</p>
    </div>
}