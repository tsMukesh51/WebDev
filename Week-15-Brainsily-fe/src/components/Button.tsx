import { ReactElement } from "react";

// type variants = 'primary' | 'secondary';
// type sizes = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
    variant: 'primary' | 'secondary';
    text: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    OnClick?: Function
}

const variantStyles = {
    "primary": "bg-purple-250 text-purple-450",
    "secondary": "bg-purple-850 text-white"
}

const defaultStyles = "px-4 py-3 rounded-md font-light flex items-center"

export function Button({ variant, text, size, startIcon, endIcon, OnClick }: ButtonProps) {

    return <button className={`${defaultStyles} ${variantStyles[variant]}`} onClick={() => {
        if (OnClick)
            OnClick();
    }}>
        {startIcon ? <div className="pr-2">{startIcon}</div> : null}
        <p>{text}</p>
        {endIcon ? <div className="pl-2">{endIcon}</div> : null}
    </button>
}