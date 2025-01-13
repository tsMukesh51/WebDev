import { Dispatch, SetStateAction } from "react";
import { BrainIcon } from "../assets/BrainIcon";
import { SiderBarItem } from "./SideBarItem";
import { Logout } from "./Logout";
import { GitHubIcon } from "../assets/GitHubIcon";
import { Link } from "react-router-dom";

export function SideBar({ setFilter, sharing }: { setFilter?: Dispatch<SetStateAction<string>>, sharing: boolean }) {
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
        <div className="flex flex-col items-end">
            <Link to={'https://github.com/tsMukesh51/WebDev/tree/master/Proj-Week-15-Brainsily-fe'} target="_blank" className="mr-5 p-2 mb-3 flex gap-2 items-center">
                <GitHubIcon /> <p className="text-2xl">GitHub Repo</p></Link>
            {sharing == false && <Logout />}
        </div>
    </div>
}