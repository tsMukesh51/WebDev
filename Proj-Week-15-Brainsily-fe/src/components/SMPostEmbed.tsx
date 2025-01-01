export function TweetEmbed({ url }: { url: string | undefined }) {
    if (url === null || url === undefined)
        return <></>
    else if (!URL.canParse(url))
        return <p>Incorrect URL</p>
    else
        return <blockquote className="twitter-tweet" data-dnt="true">
            <a href={url.replace("x.com", "twitter.com")} target="_blank"></a>
        </blockquote>
}

export function YouTubeEmbed({ url }: { url: string | undefined }) {
    if (url === null || url === undefined)
        return <></>
    else if (!URL.canParse(url))
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