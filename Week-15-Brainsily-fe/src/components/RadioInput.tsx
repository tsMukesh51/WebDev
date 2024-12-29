import { useState } from "react"
import { tuple } from "zod";

interface RadioInputProps {
    valRef?: React.MutableRefObject<any>,
    name: string,
    valueList: readonly string[],
}

export function RadioInput({ valRef, valueList, name }: RadioInputProps) {
    const [seletedVal, setSelectVal] = useState(valueList[0]);
    function setValue(value: string) {
        if (valRef) valRef.current = value;
        setSelectVal(value);
    }

    return <div className={'p-4 flex gap-2'}>
        {valueList.map((value) => {
            return <div key={value} className={seletedVal === value ? 'bg-purple-850' : 'bg-purple-250'}>
                <label htmlFor={`${name}-${value}`}>
                    <input id={`${name}-${value}`} name={name} type="radio" className="" value={value} onChange={(e) => setValue(e.target.value)} checked={seletedVal === value ? true : false} />
                    {value}
                </label>
            </div>
        })
        }
    </div>
}