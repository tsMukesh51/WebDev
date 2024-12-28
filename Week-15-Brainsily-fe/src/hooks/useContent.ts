import axios from 'axios'
import { BACKEND_URL } from '../config'
import { useEffect, useState } from 'react';
import { contentSchema } from '../schema';
import { z } from 'zod';

export function useContent() {
    const [contents, setContents] = useState<z.infer<typeof contentSchema>[]>([]);

    function getData() {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((response) => {
                setContents(response.data.contents);
            })
            .catch((response) => {
                console.log(response);
            });
    }

    function refresh() {
        getData();
    }

    useEffect(() => {
        getData();
    }, []);

    return { contents, refresh };
}