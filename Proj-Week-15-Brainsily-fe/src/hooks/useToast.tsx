import { Dispatch, MutableRefObject, useEffect, useState } from "react";
import { ToastCard } from "../components/ToastCard";

export function useToast({ setToastNoti, toastCount }: { setToastNoti?: Dispatch<React.SetStateAction<JSX.Element[]>>, toastCount?: MutableRefObject<number> }) {
    const [tempToastCount, setTempToastCount] = useState(0);
    useEffect(() => {
        console.log('toastNoti');
        if (setToastNoti && toastCount) {
            setToastNoti((toastNoti): JSX.Element[] => {
                console.log(toastNoti);
                return Array.from({ length: toastCount.current }, (_, index) => {
                    return <ToastCard key={index} />
                });
            });
        }
    }, [tempToastCount]);

    function notify() {
        if (toastCount) {
            console.log('notify');
            toastCount.current = toastCount.current + 1;
            setTempToastCount(toastCount.current);
            setTimeout(() => {
                toastCount.current = toastCount.current - 1;
                setTempToastCount(toastCount.current);
            }, 2000);
        }
    }
    return { notify };
}
