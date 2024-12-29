import { TextIcon } from "../assets/TextIcon";
import { TwitterIcon } from "../assets/TwitterIcon";
import { YouTubeIcon } from "../assets/YouTubeIcon";

type sideBarItemProps = 'image' | 'video' | 'text' | 'audio' | 'tweet' | 'ytvid' | 'link';

const sideBarItems: any = {
    'tweet': {
        'title': 'Tweets',
        'icon': <TwitterIcon />
    },
    'ytvid': {
        'title': 'YouTube',
        'icon': <YouTubeIcon />
    },
    'text': {
        'title': 'text',
        'icon': <TextIcon />
    }
}

export function SiderBarItem({ itemName }: { itemName: sideBarItemProps }) {
    return <div className="flex gap-5 items-center">
        <div className="w-8 grow-0">{sideBarItems[itemName].icon}</div>
        <p className="text-2xl">{sideBarItems[itemName].title}</p>
    </div>
}