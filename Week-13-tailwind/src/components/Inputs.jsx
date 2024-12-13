import { useRef, useState } from "react";

export const Input = ({
    type,
    placeholder,
    className
}) => {
    const timer = useRef(null);
    const [invalidMsg, setInvalidMsg] = useState(0);
    const onChangeHandler = (e) => {
        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(e.target.value)) {
            setInvalidMsg(1);
        } else {
            setInvalidMsg(2);
        }
    }
    const debounceFn = (e) => {
        if (type === 'email') {
            if (timer.current)
                clearTimeout(timer.current);
            timer.current = setTimeout(() => onChangeHandler(e), 850);
        }
    }
    return <>
        <div className={`p-2 ${className}`}>
            <input type={type} placeholder={placeholder} onChange={debounceFn} className={`bg-blue-750 rounded-md outline-none border-2 border-gray-400 text-xl p-3 text-gray-400 placeholder:text-gray-400 placeholder:opacity-40 h-12 w-72`} />
            {invalidMsg === 1 ? <p className={`text-center text-red-600`}>Email is invalid</p> : invalidMsg === 2 ? <p className={`text-center text-green-600`}>Email is valid</p> : ''}
        </div>
    </>
}