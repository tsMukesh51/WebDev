import { Tweet } from "react-tweet"

export function TweetEmbed({ url }: { url: string | undefined }) {
    if (url === null || url === undefined)
        return <></>
    if (!URL.canParse(url))
        return <p>Incorrect URL</p>
    const id = url.split('/').pop();
    if (id != undefined)
        return <Tweet id={id} />
    else
        return <></>

}

export function YouTubeEmbed({ url }: { url: string | undefined }) {
    if (url === null || url === undefined)
        return <></>
    if (!URL.canParse(url))
        return <p>Incorrect URL</p>
    else
        return <iframe
            className="w-full h-[304px]"
            src={url
                .replace('youtu.be', 'youtube.com')
                .replace('youtube.com', 'youtube-nocookie.com')
                .replace("watch", "embed")
                .replace("?v=", "/")
                .concat('?controls=0&autoplay=0')}
            title="YouTube video player"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
        ></iframe>
}