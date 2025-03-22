import { Prisma } from "@repo/db/client";

interface IDrawer {
    canvas: HTMLCanvasElement;
    socket: WebSocket,
    elements: Partial<Prisma.Element>[],
    board: Prisma.Board
}

export class Drawer {
    // @ts-ignore
    socket: WebSocket = null;
    isDrawing = false;
    // startPoint = [0, 0];
    // endPoint = [0, 0];
    currEle: Partial<Prisma.Element> = {
        shapeType: Prisma.ShapeType.RECTANGLE,
        shapeProperties: {
            startPoint: [0, 0],
            endPoint: [0, 0]
        }
    };
    presentElements: Partial<Prisma.Element>[] = [];
    drawContext: CanvasRenderingContext2D;
    // shapeType: Prisma.ShapeType = Prisma.ShapeType.RECTANGLE;
    board;
    canvas: HTMLCanvasElement;

    constructor({ canvas, socket, elements, board }: IDrawer) {
        this.canvas = canvas;
        this.socket = socket
        this.presentElements = Array.isArray(elements) ? elements : [];
        this.board = board;
        // @ts-ignore
        this.drawContext = this.canvas.getContext('2d');

        canvas.addEventListener('mousedown', (evt) => {
            this.mouseDownHandler(evt);
        });
        canvas.addEventListener('mouseup', (evt) => {
            this.mouseUpHandler(evt);
        });
        canvas.addEventListener('mousemove', (evt) => {
            this.mouseMoveHandler(evt);
        });
    }

    mouseDownHandler(evt: MouseEvent) {
        this.isDrawing = true;
        // @ts-ignore
        this.currEle.shapeProperties.startPoint = [evt.clientX, evt.clientY];

    }
    mouseMoveHandler(evt: MouseEvent) {
        if (this.isDrawing) {
            // console.log(evt);
            // @ts-ignore
            this.currEle.shapeProperties.endPoint = [evt.clientX, evt.clientY];
            this.drawCurrShape();
        }
    }
    mouseUpHandler(evt: MouseEvent) {
        this.isDrawing = false;
        // @ts-ignore
        this.currEle.shapeProperties.endPoint = [evt.clientX, evt.clientY];
        this.presentElements.push({
            ...this.currEle,
            shapeProperties: { ...this.currEle.shapeProperties }
        });
        console.log(this.presentElements);
        this.drawPreShapes();
    }

    selectShape(shape: Prisma.ShapeType) {
        // @ts-ignore
        this.currEle.shapeType = shape.toString();
        console.log(this.currEle.shapeType)
    }

    drawShape(shape: Partial<Prisma.Element>) {
        if (shape.shapeType == Prisma.ShapeType.RECTANGLE) {
            // @ts-ignore
            const width = shape.shapeProperties.endPoint[0] - shape.shapeProperties.startPoint[0];
            // @ts-ignore
            const height = shape.shapeProperties.endPoint[1] - shape.shapeProperties.startPoint[1];
            // @ts-ignore
            // console.log(shape.shapeProperties.startPoint[0], shape.shapeProperties.startPoint[1], width, height);
            this.drawContext.strokeStyle = "green";
            this.drawContext.lineWidth = 2;
            // @ts-ignore
            this.drawContext.strokeRect(shape.shapeProperties.startPoint[0], shape.shapeProperties.startPoint[1], width, height);
        } else if (shape.shapeType == Prisma.ShapeType.CIRCLE) {

        } else if (shape.shapeType == Prisma.ShapeType.LINE) {

        } else {
            console.log(`Unknow shapeType ${shape.shapeType}`);
        }
    }

    drawCurrShape() {
        this.drawPreShapes();
        this.drawShape(this.currEle);
    }

    drawPreShapes() {
        this.drawContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.presentElements.forEach((element) => {
            this.drawShape(element);
        });
    }
}