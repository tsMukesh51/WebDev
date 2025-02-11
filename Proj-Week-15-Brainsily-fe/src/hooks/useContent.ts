import axios from 'axios'
import { BACKEND_URL } from '../config'
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { contentSchema } from '../schema';
import { z } from 'zod';
import { Types } from 'mongoose';

export const createContentType = contentSchema.omit({ id: true, createdAt: true });

interface useContentProps {
    comp?: string,
    shareLink?: string
}

export function useContent({ comp = 'Dashboard', shareLink = "" }: useContentProps) {
    const [contents, setContents] = useState<z.infer<typeof contentSchema>[]>([]);

    function getContents() {
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

    function getSharedContents(shareLink: string) {
        axios.get(`${BACKEND_URL}/api/v1/brain/${shareLink}`, {})
            .then((response) => {
                setContents(response.data.contents);
            })
            .catch((response) => {
                console.log(response);
                setContents(null);
            });
    }

    function createContent(content: z.infer<typeof createContentType>, setIsModal: Dispatch<SetStateAction<boolean>>) {
        axios.post(`${BACKEND_URL}/api/v1/content/`, {
            body: content.body,
            contentFormat: content.contentFormat,
            title: content.title
        }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                if (res.data.msg === "Content Created") {
                    getContents();
                    setIsModal(false);
                } else {
                    console.log(`something went wrong while creating`);
                    console.log(res);
                }
            })
            .catch((res) => {
                console.log(res);
                alert('Network Error, try again');
            })
    }

    function deleteContent(contentId: Types.ObjectId) {
        axios.delete(`${BACKEND_URL}/api/v1/content/${contentId.toString()}`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                if (res.data.msg === "Content Deleted") {
                    setContents((prev) => prev.filter((content) => content.id !== contentId));
                } else {
                    console.log(`something went wrong while deleting`);
                    console.log(res);
                }
            })
            .catch((res) => {
                console.log(res);
                alert('Network Error, try again');
            })
    }

    useEffect(() => {
        if (comp == 'Dashboard')
            getContents();
        else if (comp == 'Shareboard')
            getSharedContents(shareLink);
    }, []);

    return { contents, sharedContents: getSharedContents, refresh: getContents, deleteContent, createContent };
}