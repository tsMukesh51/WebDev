import { useRef } from "react"

export const Otp = ({ setOtpValid, number }) => {
    const numBoxes = useRef(Array(number).fill(null));
    const isOtpValid = () => {
        let isValid = false;
        numBoxes.current.forEach((e) => {
            if (e.value === "") {
                isValid = false;
                return;
            }
        });
        setOtpValid(isValid);
    }
    const front = (index) => {
        console.log(numBoxes);
        if (index < number - 1) {
            console.log(numBoxes.current[index + 1]);
            numBoxes.current[index + 1].focus();
        }
    }
    const back = (index) => {
        if (index > 0) {
            console.log(numBoxes.current[index - 1]);
            numBoxes.current[index - 1].focus();
        }
    }
    return <>
        {Array(number).fill(0).map((val, index) => (
            <NumBox
                key={index}
                ref={(e) => { numBoxes.current[index] = e }}
                goFront={() => front(index)}
                goBack={() => back(index)}
                validate={isOtpValid} />
        ))}
    </>
}

const NumBox = ({ goFront, goBack, validate, ref }) => {
    const onKeyUpHandler = (e) => {
        const isNumber = e.key >= "0" && e.key <= "9";
        if (e.key == "Backspace") {
            e.target.value = "";
            goBack();
            validate();
        } else if (e.key == "ArrowLeft") {
            goBack();
        } else if (e.key == "ArrowRight") {
            goFront();
        } else if (e.key == "Delete") {
            e.target.value = "";
            validate();
        } else if (isNumber) {
            e.target.value = e.target.value;
            validate();
        } else {
            e.target.value = "";
        }
    }
    return <>
        <input ref={ref} type="text" onKeyUp={onKeyUpHandler} />
    </>
} 