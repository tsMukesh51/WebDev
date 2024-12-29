import { useEffect } from "react"

interface useScriptProp {
    url: string,
    integrity?: string,
    async?: boolean,
    crossOrigin?: "anonymous" | "use-credentials"
}

export const useScript = ({ url, integrity, async, crossOrigin }: useScriptProp) => {
    useEffect(() => {
        const script = document.createElement("script")
        script.src = url;
        if (integrity) {
            script.integrity = integrity;
        }
        script.async = async ?? true;
        script.crossOrigin = crossOrigin ?? "anonymous";

        document.body.appendChild(script)

        return () => {
            document.body.removeChild(script)
        }
    }, [url, integrity, async, crossOrigin])
}
