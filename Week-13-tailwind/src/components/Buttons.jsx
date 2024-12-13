export const Button = ({ disabled, fn, children }) => {
    return <div>
        <button className={`py-5 px-28 text-xl ${disabled ? 'bg-gray-400' : 'bg-blue-200'} rounded-md`} onClick={fn} disabled={disabled}>{children}</button>
    </div>
} 