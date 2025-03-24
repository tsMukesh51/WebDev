import { Prisma } from "@repo/db/client"
import { Dispatch, SetStateAction } from "react"
import { RectangleIcon } from "../icons/rectangle"
import { Circle } from "../icons/circle"
import { Line } from "../icons/line"

export interface IShapeOptions {
    selectedShape: Prisma.$Enums.ShapeType,
    setSelectedShape: Dispatch<SetStateAction<Prisma.$Enums.ShapeType>>
}

export function ShapeOptions({ selectedShape: shapeOpProp, setSelectedShape: setShapeOpProp }: IShapeOptions) {
    return <div className="fixed top-10 left-1/2 z-[2] flex bg-zinc-200 rounded gap-2 p-1">
        <button onClick={() => setShapeOpProp(Prisma.ShapeType.RECTANGLE)}>
            <RectangleIcon className={(shapeOpProp == Prisma.ShapeType.RECTANGLE ? "stroke-cyan-500 " : "stroke-black ") + "size-8"} />
        </button>
        <button onClick={() => setShapeOpProp(Prisma.ShapeType.CIRCLE)}>
            <Circle className={(shapeOpProp == Prisma.ShapeType.CIRCLE ? "stroke-cyan-500 fill-cyan-500 " : "stroke-black ") + "size-8"} />
        </button>
        <button onClick={() => setShapeOpProp(Prisma.ShapeType.LINE)}>
            <Line className={(shapeOpProp == Prisma.ShapeType.LINE ? "stroke-cyan-500 fill-cyan-500 " : "stroke-black ") + "size-8"} />
        </button>
    </div>
}