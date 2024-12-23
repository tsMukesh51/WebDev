import { useEffect, useReducer, useRef, useState } from "react";

export function CreateContentModel({ modalOpen }: { modalOpen: React.RefObject<boolean> }) {
    const dialog = useRef<HTMLDialogElement | null>(null);
    const [reRender, setReRender] = useState(true);
    useEffect(() => {
        console.log('effect');
        if (dialog.current) {
            if (modalOpen.current == true) {
                console.log('show');
                dialog.current.showModal();
            } else {
                dialog.current.close();
            }
        } else {
            setReRender(reRender => !reRender);
        }
    }, [modalOpen.current]);
    return <dialog ref={dialog}>
        <p>Namaste</p>
    </dialog>;
}