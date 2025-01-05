import { Dispatch, SetStateAction } from "react";
import { BrainIcon } from "../assets/BrainIcon";
import { SiderBarItem } from "./SideBarItem";
import { Logout } from "./Logout";

export function SideBar({ setFilter }: { setFilter?: Dispatch<SetStateAction<string>> }) {
    return <div className={"flex flex-col justify-between h-full"}>
        <div>
            <div className="flex gap-3 items-center mb-16">
                <div className={'w-14'}><BrainIcon /></div>
                <h2 className="text-4xl">Brainsily</h2>
            </div>
            <div className={"grid grid-flow-row ml-4 gap-2"}>
                <SiderBarItem itemName={'all'} setFilter={setFilter} />
                <SiderBarItem itemName={'tweet'} setFilter={setFilter} />
                <SiderBarItem itemName={'ytvid'} setFilter={setFilter} />
                <SiderBarItem itemName={'text'} setFilter={setFilter} />
                <SiderBarItem itemName={'link'} setFilter={setFilter} />
            </div>
        </div>
        <Logout />
    </div>
}