interface TextInputProps {
    placeholder: string,
    valueType?: any,
    reference?: any,
    name?: string
}

export function TextInput({ placeholder, valueType, reference, name }: TextInputProps) {
    return <div>
        <input ref={reference} name={name} type="text" placeholder={placeholder} className="p-1 rounded-md border-[1px]" />
    </div>
}