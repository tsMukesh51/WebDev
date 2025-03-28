import { ReactElement } from "react";

// type variants = 'primary' | 'secondary';
// type sizes = 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps {
    variant: 'primary' | 'secondary';
    text: string;
    size: 'sm' | 'md' | 'lg' | 'xl';
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    loading?: boolean;
    OnClick?: Function
}

const variantStyles = {
    "primary": "bg-purple-250 text-purple-450",
    "secondary": "bg-purple-850 text-white"
}

const sizeStyles = {
    "sm": "p-2",
    "md": "p-4",
    "lg": "p-6",
    "xl": "p-8",
}

const defaultStyles = "px-4 py-3 rounded-md font-light flex items-center w-fit"

export function Button({ variant, text, size, startIcon, endIcon, loading, OnClick }: ButtonProps) {

    return <button className={`${defaultStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${loading ? 'opacity-40' : null}`} onClick={() => {
        if (OnClick)
            OnClick();
    }}>
        {startIcon ? <div className="pr-2">{startIcon}</div> : null}
        <p>{text}</p>
        {endIcon ? <div className="pl-2">{endIcon}</div> : null}
    </button>
}