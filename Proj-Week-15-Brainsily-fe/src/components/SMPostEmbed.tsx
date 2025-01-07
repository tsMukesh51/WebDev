import { Tweet } from "react-tweet"

export function TweetEmbed({ url }: { url: string | undefined }) {
    if (url === null || url === undefined)
        return <></>
    if (!URL.canParse(url))
        return <p>Incorrect URL</p>
    const id = url.split('/').pop();
    if (id != undefined)
        return <div className="light"><Tweet id={id} /></div>
    else
        return <></>

}

export function YouTubeEmbed({ url }: { url: string | undefined }) {
    if (url === null || url === undefined)
        return <></>
    if (!URL.canParse(url))
        return <p>Incorrect URL</p>
    else {
        return <iframe
            className="w-full h-[304px]"
            src={CleanYtUrl({ url }).concat('?controls=0&autoplay=0')}
            title="YouTube video player"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        ></iframe>
    }
}

export function CleanYtUrl({ url }: { url: string }) {
    let yturl = '';
    if (url.includes('youtu.be')) {
        yturl = url.split('?')[0].replace('youtu.be', 'www.youtube-nocookie.com/embed');
    } else if (url.includes('youtube.com')) {
        yturl = url.replace('youtube.com', 'youtube-nocookie.com').replace("watch?v=", "embed/");
    } else {
        yturl = url;
    }
    return yturl;
}