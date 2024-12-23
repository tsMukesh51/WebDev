import { BrainIcon } from "../assets/BrainIcon";
import { SiderBarItem } from "./SideBarItem";

export function SideBar() {
    return <div className={""}>
        <div className="flex gap-3 items-center mb-16">
            <div className={'w-14'}><BrainIcon /></div>
            <h2 className="text-4xl">Brainsily</h2>
        </div>
        <div className={"grid grid-flow-row ml-4 gap-6"}>
            <SiderBarItem itemName={'tweet'} />
            <SiderBarItem itemName={'ytvid'} />
            <SiderBarItem itemName={'text'} />
        </div>
    </div>
}