interface TextInputProps {
    placeholder: string,
    allowedValues?: string[]
}

export function TextInput({ placeholder, allowedValues }: TextInputProps) {
    return <div>
        <input type="text" placeholder={placeholder} className="p-1 rounded-md border-[1px]" />
    </div>
}