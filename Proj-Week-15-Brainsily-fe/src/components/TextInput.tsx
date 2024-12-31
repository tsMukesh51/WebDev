interface TextInputProps {
    placeholder: string,
    reference?: any,
    name?: string,
    errors?: string[]
}

export function TextInput({ placeholder, reference, name, errors }: TextInputProps) {
    return <div>
        <input ref={reference} name={name} type="text" placeholder={placeholder} className="p-1 rounded-md border-[1px]" />
        {errors && (
            <ul>
                {errors.map((error, index) => (
                    <li key={index} className="text-red-500 text-sm">
                        {error}
                    </li>
                ))}
            </ul>
        )}
    </div>
}