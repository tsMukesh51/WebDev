export const Button = ({ disabled, fn, children }) => {
    return <div>
        <button className={`py-8 px-32 text-xl ${disabled ? 'bg-gray-400' : 'bg-red-200'} rounded-md`} onClick={fn} disabled={disabled}>{children}</button>
    </div>
} 