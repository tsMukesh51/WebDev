interface TextInputProps {
    placeholder: string,
    allowedValues?: string[],
    reference?: any;
}

export function TextInput({ placeholder, allowedValues, reference }: TextInputProps) {
    return <div>
        <input ref={reference} type="text" placeholder={placeholder} className="p-1 rounded-md border-[1px]" />
    </div>
}