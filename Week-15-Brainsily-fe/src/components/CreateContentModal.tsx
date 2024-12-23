import { Dispatch, SetStateAction, useEffect, useRef } from "react";
import { CloseIcon } from "../assets/CloseIcon";
import { TextInput } from "./TextInput";
import { Button } from "./Button";

interface CreateContentModalProps {
    isModal: boolean,
    setIsModal: Dispatch<SetStateAction<boolean>>
}

export function CreateContentModel({ isModal, setIsModal }: CreateContentModalProps) {
    const dialog = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        if (dialog.current != null) {
            if (isModal == true) {
                dialog.current.showModal();
            } else if (isModal == false) {
                dialog.current.close();
            }
        }
    }, [isModal]);
    return <dialog ref={dialog} className=" rounded-lg">
        <div className="p-3 w-full">
            <div className="text-right">
                <button onClick={() => setIsModal(isModal => isModal = false)}>
                    <CloseIcon />
                </button>
            </div>
            <div className="flex flex-col gap-4 items-center">
                <TextInput placeholder="Title" />
                <TextInput placeholder="things..." />
                <Button text="Submit" variant="secondary" size="lg"></Button>
            </div>
        </div>
    </dialog>;
}