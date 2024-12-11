import { useEffect, useRef, useState } from "react";


export function useDebounce(value, delay = 1000) {
    const timer = useRef(null);
    const [debouced, setDecounced] = useState(null);
    useEffect(() => {
        if (timer.current)
            clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            console.log('updating');
            setDecounced(value);
        }, delay);
    }, [value]);
    return debouced;
}