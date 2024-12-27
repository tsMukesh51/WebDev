import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useEffect, useState } from 'react';

export function useContent() {
    const [contents, setContents] = useState([]);

    function getData() {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                // console.log(response);
                // console.log("then");
                setContents(response.data.contents);
            })
            .catch((response) => {
                // console.log(response);
                // console.log("catch");
                setContents(response.data.contents);
            });
    }

    useEffect(() => {
        getData();
        const interval = setInterval(getData, 10000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return { contents };
}