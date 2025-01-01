import { Dispatch, SetStateAction, useState } from "react"

interface RadioInputProps {
    valRef?: React.MutableRefObject<any>,
    name: string,
    valueList: readonly string[],
    OnChangeState?: Dispatch<SetStateAction<string>>
}

export function RadioInput({ valRef, valueList, name, OnChangeState }: RadioInputProps) {
    const [seletedVal, setSelectVal] = useState(valueList[0]);
    function OnChangeHandler(value: string, cbFn: Dispatch<SetStateAction<string>> | undefined) {
        if (valRef) valRef.current = value;
        setSelectVal(value);
        if (cbFn)
            cbFn(value);
    }

    return <div className={'p-4 flex gap-2'}>
        {valueList.map((value) => {
            return <div key={value} className={`rounded-xl ` + (seletedVal === value ? 'bg-purple-850' : 'bg-purple-250')}>
                <label htmlFor={`${name}-${value}`} className={`p-4 cursor-pointer block `}>
                    <input id={`${name}-${value}`} name={name} type="radio" className={`hidden`} value={value} onChange={(e) => OnChangeHandler(e.target.value, OnChangeState)} checked={seletedVal === value ? true : false} />
                    {value}
                </label>
            </div>
        })
        }
    </div>
}