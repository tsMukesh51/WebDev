import { z } from "zod";
import { Types } from "mongoose";

import { contentSchema } from "../schema";

import { Dustbin } from "../assets/DustbinIcon";
import { ShareIcon } from "../assets/ShareIcon";
import { TextIcon } from "../assets/TextIcon";
import { TwitterIcon } from "../assets/TwitterIcon";
import { YouTubeIcon } from "../assets/YouTubeIcon";
import { LinkIcon } from "../assets/LinkIcon";

type CardProps = z.infer<typeof contentSchema> & {
    deleteContent: (contentId: Types.ObjectId) => void;
};
//'text', 'tweet', 'ytvid', 'link'
const contentFormatIcons = {
    "text": <TextIcon />,
    "tweet": <TwitterIcon />,
    "ytvid": <YouTubeIcon />,
    "link": <LinkIcon />,
}

const defaultStyles = "bg-white rounded-xl shadow-md border-slate-200 border-[1px] p-5 w-full max-h-[510px] flex flex-col gap-6";

export function Card({ id, contentFormat, body, title, createdAt, deleteContent }: CardProps) {
    return <div key={id.toString()} className={defaultStyles}>
        <div className="flex items-center justify-between gap-3">
            <div className="shrink-0">
                {contentFormatIcons[contentFormat]}
            </div>
            <p className="grow text-2xl">{title}</p>
            <div className="flex items-center gap-3 p-2 text-gray-500 shrink-0">
                <button onClick={() => { }}><ShareIcon /></button>
                <button onClick={() => { deleteContent(id) }}><Dustbin /></button>
            </div>
        </div>
        <div className="overflow-y-scroll h-full">
            {contentFormat === 'text' && <p>{body}</p>}
            {contentFormat === 'tweet' &&
                <blockquote className="twitter-tweet" data-dnt="true">
                    <a href={body.replace("x.com", "twitter.com")} target='_blank'></a>
                </blockquote>}
            {contentFormat === 'ytvid' && <iframe
                className="w-full h-[304px]"
                src={body
                    .replace('youtube', 'youtube-nocookie')
                    .replace("watch", "embed")
                    .replace("?v=", "/")
                    .concat('?controls=0')}
                title="YouTube video player"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
            ></iframe>}
        </div>
        <div className="flex gap-2">
            <p className="bg-purple-250 text-purple-450 rounded-full w-min py-1 px-3 text-sm">#productivity</p>
            <p className="bg-purple-250 text-purple-450 rounded-full w-min py-1 px-3 text-sm">#ideas</p>
        </div>
        <p className="text-slate-400">Added on {createdAt ? new Date(createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: '2-digit', }) : 1970}</p>
    </div>
}