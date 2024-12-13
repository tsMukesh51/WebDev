export const Button = ({ disabled, fn, children }) => {
    return <div>
        <Button className={`px-8 py-32 text-xl ${disabled ? 'bg-gray-400' : 'bg-red-200'}`} onClick={fn}>{children}</Button>
    </div>
} 