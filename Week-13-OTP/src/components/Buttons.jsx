export const Button = ({ enabled, children }) => {
    return <div>
        <button disabled={!enabled} className={`p-8 ${enabled ? 'bg-blue-600' : 'bg-gray-300'} rounded-xl w-48`}>{children}</button>
    </div>
}