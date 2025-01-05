import { Dispatch, SetStateAction } from "react";
import { LinkIcon } from "../assets/LinkIcon";
import { TextIcon } from "../assets/TextIcon";
import { TwitterIcon } from "../assets/TwitterIcon";
import { YouTubeIcon } from "../assets/YouTubeIcon";
import { contentType } from "../schema";
// type sideBarItemProps = 'image' | 'video' | 'text' | 'audio' | 'tweet' | 'ytvid' | 'link';

type ContentType = (typeof contentType)[number] | 'all';

const sideBarItems: Record<ContentType, { title: string, icon: JSX.Element }> = {
    'all': {
        'title': 'All',
        'icon': <></>
    },
    'tweet': {
        'title': 'Tweets',
        'icon': <TwitterIcon />
    },
    'ytvid': {
        'title': 'YouTube',
        'icon': <YouTubeIcon />
    },
    'text': {
        'title': 'Text',
        'icon': <TextIcon />
    },
    'link': {
        'title': 'Links',
        'icon': <LinkIcon />
    }
}

export function SiderBarItem({ itemName, setFilter }: { itemName: ContentType, setFilter?: Dispatch<SetStateAction<string>> }) {
    return <button className="flex gap-5 p-2 items-center rounded-md transition-colors duration-300 hover:bg-slate-300" onClick={() => { if (setFilter) setFilter(itemName) }}>
        <div className="w-8 grow-0">{sideBarItems[itemName].icon}</div>
        <p className="text-2xl">{sideBarItems[itemName].title}</p>
    </button>
}