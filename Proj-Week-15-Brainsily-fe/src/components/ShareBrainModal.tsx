import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";

import { CloseIcon } from "../assets/CloseIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface ShareBrainModalProps {
    isShareModal: boolean,
    setIsShareModal: Dispatch<SetStateAction<boolean>>,
}

export function ShareBrainModal({ isShareModal, setIsShareModal }: ShareBrainModalProps) {
    const dialog = useRef<HTMLDialogElement>(null);
    const [sharedLink, setSharedLink] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/brain/share`, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                if (res.data.msg == 'Share link created successfully') {
                    if (inputRef.current)
                        inputRef.current.checked = true;
                    setSharedLink(() => res.data.sharedLink);
                }
                else if (res.data.msg == 'Share link disabled') {
                    if (inputRef.current)
                        inputRef.current.checked = false;
                    setSharedLink(() => '');
                }
            })
            .catch((res) => {
                console.log(res);
                alert('something went wrong');
            });
    }, []);

    useEffect(() => {
        if (dialog) {
            if (isShareModal)
                dialog.current?.showModal();
            else
                dialog.current?.close();
        }
    }, [isShareModal]);

    function OnChangeHandle(shareState: boolean) {
        axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
            isShared: shareState
        }, {
            headers: {
                'Authorization': localStorage.getItem('token')
            }
        })
            .then((res) => {
                if (res.data.msg == 'Share link created successfully')
                    setSharedLink(() => res.data.sharedLink);
                else if (res.data.msg == 'Share link disabled')
                    setSharedLink(() => '');
            })
            .catch((res) => {
                console.log(res);
                alert('something went wrong');
            })
    }

    return <dialog ref={dialog} className="rounded-lg">
        <div className="p-3 w-full">

            <div className="text-right">
                <button onClick={() => setIsShareModal(() => { return false; })}>
                    <CloseIcon />
                </button>
            </div>
            <div className="flex justify-between w-40">
                <label htmlFor="isShared">Public
                </label>
                <input ref={inputRef} type="checkbox" id="isShared" onChange={(e) => OnChangeHandle(e.target.checked)}></input>
            </div>

            {sharedLink != '' &&
                <div>
                    <p>{window.location.origin}/shared/{sharedLink}</p>
                </div>}

        </div>
    </dialog>
}