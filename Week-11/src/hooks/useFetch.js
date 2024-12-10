import { useEffect, useRef, useState } from "react";

export function useFetch(url) {
    const [dataa, setDataa] = useState({});
    const [loading, setLoading] = useState(true);
    const debounceTimeout = useRef(null);
    const updateInterval = useRef(null);

    async function getData(url) {
        console.log('getting...');
        setLoading(true);
        try {
            const fetchData = await fetch(url);
            const jsonData = await fetchData.json();
            setDataa(jsonData);
        } catch (err) {
            console.log(err.name);
        } finally {
            setLoading(false);
        }
    }

    async function updateData(url) {
        console.log('updateing...');
        try {
            const fetchData = await fetch(url);
            const jsonData = await fetchData.json();
            setDataa(jsonData);
        } catch (err) {
            console.log(err.name);
        }
    }

    // useEffect(() => {
    //     getData(url);
    // }, [url]);

    useEffect(() => {
        if (debounceTimeout.current)
            clearTimeout(debounceTimeout.current)
        debounceTimeout.current = setTimeout(async function () {
            getData(url);
            if (updateInterval.current)
                clearInterval(updateInterval.current);
            updateInterval.current = setInterval(() => updateData(url), 15000);
        }, 2000);

        return () => {
            console.log('unmounting...');
            clearInterval(updateInterval.current);
            clearTimeout(debounceTimeout.current);
        }
    }, [url]);

    return { dataa, loading };
} 