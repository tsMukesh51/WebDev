export const Input = ({
    type,
    placeholder
}) => {
    return <>
        <div>
            <input type={type} placeholder={placeholder} className={`bg-blue-300 rounded-md`} />
        </div>
    </>
}