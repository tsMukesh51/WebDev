import { useEffect, useState } from "react";

export function useFetch() {
    const [dataa, setDataa] = useState({});
    // const [loading, setLoading] = useState(true);
    
    async function getData() {
        const fetchData = await fetch("https://jsonplaceholder.typicode.com/todos/1");
        const jsonData = await fetchData.json();
        setDataa(jsonData);
    }
  
    useEffect(() => {
        // setLoading(true);
        getData();
        // setLoading(false);
    },[]);
    return {dataa};
} 