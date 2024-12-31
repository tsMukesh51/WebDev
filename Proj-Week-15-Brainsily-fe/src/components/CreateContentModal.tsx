import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { z } from "zod";

import { CloseIcon } from "../assets/CloseIcon";
import { TextInput } from "./TextInput";
import { Button } from "./Button";
import { createContentType } from "../hooks/useContent";
import { RadioInput } from "./RadioInput";
import { contentSchema, contentType } from "../schema";

interface CreateContentModalProps {
    isModal: boolean,
    setIsModal: Dispatch<SetStateAction<boolean>>,
    createContent: (content: z.infer<typeof createContentType>, setIsModal: Dispatch<SetStateAction<boolean>>) => void
}

export function CreateContentModel({ isModal, setIsModal, createContent }: CreateContentModalProps) {
    const dialog = useRef<HTMLDialogElement>(null);
    const [validErrors, setValidErrors] = useState<Record<string, string[]>>({});
    const contentRef = {
        body: useRef<HTMLInputElement>(null),
        contentFormat: useRef<z.infer<typeof createContentType.shape.contentFormat>>("text"),
        title: useRef<HTMLInputElement>(null),
    }

    function submitModal({ content, setIsModal }: { content: z.infer<typeof createContentType>, setIsModal: Dispatch<SetStateAction<boolean>> }) {
        const { success, data, error } = createContentType.safeParse(content);
        if (!success) {
            console.log(content);
            console.log(error);
            const errors: Record<string, string[]> = {};
            error.issues.forEach((err) => {
                err.path.forEach((path) => {
                    errors[path.toString()].push(err.message);
                });
            })
            setValidErrors(errors);
            return;
        } else {
            createContent(content, setIsModal);
        }
    }

    useEffect(() => {
        if (dialog.current != null) {
            if (isModal == true) {
                dialog.current.showModal();
            } else if (isModal == false) {
                dialog.current.close();
            }
        }
    }, [isModal]);
    // solve bug for esc button
    return <dialog ref={dialog} className="rounded-lg">
        <div className="p-3 w-full">
            <div className="text-right">
                <button onClick={() => setIsModal(() => { return false; })}>
                    <CloseIcon />
                </button>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <TextInput reference={contentRef.title} placeholder="Title" errors={validErrors['title']} />
                <TextInput reference={contentRef.body} placeholder="Content or Link" errors={validErrors['body']} />
                <RadioInput valRef={contentRef.contentFormat} name="contentFormat" valueList={contentType} />
                <Button text="Submit" variant="secondary" size="lg" OnClick={() => {
                    const content = {
                        contentFormat: contentRef.contentFormat.current,
                        body: contentRef.body.current.value || '',
                        title: contentRef.title.current.value || ''
                    }
                    submitModal({ content, setIsModal })
                }}></Button>
            </div>
        </div>
    </dialog >;
}