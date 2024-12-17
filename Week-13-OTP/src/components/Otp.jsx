import { useEffect, useRef, forwardRef, useState } from "react"

export const Otp = ({ setOtpValid, number }) => {
    const numBoxes = useRef(Array(number).fill(null));
    const timer = useRef(null);
    const isOtpValid = () => {
        if (timer.current)
            clearTimeout(timer.current);
        setTimeout(() => {
            let isValid = true;
            numBoxes.current.forEach((e) => {
                if (e.value === "") {
                    isValid = false;
                    return;
                }
            })
            setOtpValid(isValid);
        }, 350);
    }
    const front = (index) => {
        console.log(numBoxes);
        if (index < number - 1) {
            numBoxes.current[index + 1].focus();
        }
    }
    const back = (index) => {
        if (index > 0) {
            numBoxes.current[index - 1].focus();
        }
    }
    return <div className={`flex p-10`}>
        {Array(number).fill(0).map((val, index) => (
            <NumBox
                key={index}
                ref={(e) => { numBoxes.current[index] = e; }}
                goFront={() => front(index)}
                goBack={() => back(index)}
                validate={isOtpValid} />
        ))}
    </div>
}

const NumBox = forwardRef(({ goFront, goBack, validate }, ref) => {
    const [val, setValue] = useState("");

    const onKeyUpHandler = (e) => {
        const isNumber = e.key >= "0" && e.key <= "9";
        if (e.key == "Backspace") {
            setValue("");
            goBack();
            validate();
        } else if (e.key == "ArrowLeft") {
            goBack();
        } else if (e.key == "ArrowRight") {
            goFront();
        } else if (e.key == "Delete") {
            setValue("");
            validate();
        } else if (isNumber) {
            setValue(e.key);
            goFront();
            validate();
        }
    }

    const onChangeHandler = (e) => {
        // const isNumber = e.key >= "0" && e.key <= "9";
        // if (isNumber) {
        //     setValue(e.target.value);
        //     goFront();
        //     validate();
        // }
    }

    return <input value={val} ref={ref} type="text" className={`w-12 h-16 m-2 rounded-md text-4xl text-center caret-transparent bg-gray-900 text-white focus:bg-slate-500 outline-none`} onChange={onChangeHandler} onKeyUp={onKeyUpHandler} />
})