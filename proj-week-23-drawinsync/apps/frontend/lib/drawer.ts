import { Prisma } from "@repo/db/client"
import { Dispatch, SetStateAction } from "react";

type IShapeProperties = {
    startPointX: number,
    startPointY: number,
    endPointX: number,
    endPointY: number
}

interface IDrawer {
    canvas: HTMLCanvasElement;
    socket: WebSocket,
    elements: Partial<Prisma.Element>[],
    board: Prisma.Board
}

export class Drawer {
    ws: WebSocket;
    board: Prisma.Board;
    canvas: HTMLCanvasElement;
    drawContext: CanvasRenderingContext2D;
    isDrawing = false;
    syncedElements: Partial<Prisma.Element>[] = [];
    // drawnElements: Partial<Prisma.Element>[] = [];
    currEle: Partial<Prisma.Element> = {};

    constructor({ canvas, socket, elements, board }: IDrawer) {
        this.canvas = canvas;
        this.ws = socket
        this.syncedElements = Array.isArray(elements) ? elements : [];
        this.board = board;
        this.drawContext = this.canvas.getContext('2d')!;
        this.currEle = {
            shapeType: Prisma.ShapeType.RECTANGLE,
            shapeProperties: {
                startPointX: 0,
                startPointY: 0,
                endPointX: 0,
                endPointY: 0
            }
        };

        // bug when joining, if shape is added will be missed.
        this.ws.onmessage = (message) => {
            console.log(`message received`, message.data)
        }
        this.ws.send(JSON.stringify({
            msgType: 'SHAPE',
            eleType: 'ADD',
            element: this.currEle
        }));

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

    getVirtX(x: number) {
        return x - this.canvas.width / 2 + window.pageXOffset;
    }
    getVirtY(y: number) {
        return y - this.canvas.height / 2 + window.pageYOffset;
    }
    getX(x: number) {
        return x + this.canvas.width / 2;
    }
    getY(y: number) {
        return y + this.canvas.height / 2;
    }

    mouseDownHandler(evt: MouseEvent) {
        if (this.isDrawing == false) {
            (this.currEle.shapeProperties as IShapeProperties).startPointX = this.getVirtX(evt.clientX);
            (this.currEle.shapeProperties as IShapeProperties).startPointY = this.getVirtY(evt.clientY);
        }
        this.isDrawing = true;

    }
    mouseMoveHandler(evt: MouseEvent) {
        if (this.isDrawing) {
            // console.log(evt);
            (this.currEle.shapeProperties as IShapeProperties).endPointX = this.getVirtX(evt.clientX);
            (this.currEle.shapeProperties as IShapeProperties).endPointY = this.getVirtY(evt.clientY);
            this.drawCurrShape();
        }
    }
    mouseUpHandler(evt: MouseEvent) {
        this.isDrawing = false;
        (this.currEle.shapeProperties as IShapeProperties).endPointX = this.getVirtX(evt.clientX);
        (this.currEle.shapeProperties as IShapeProperties).endPointY = this.getVirtY(evt.clientY);
        this.syncedElements.push({
            ...this.currEle,
            shapeProperties: { ...this.currEle.shapeProperties as IShapeProperties }
        });
        // console.log(this.presentElements);
        this.drawPreShapes();
    }

    selectShape(shape: Prisma.ShapeType) {
        this.currEle.shapeType = shape;
    }

    drawShape(shape: Partial<Prisma.Element>, isTemp: boolean) {
        if (isTemp) {
            this.drawContext.strokeStyle = "#DCDCDC";
            this.drawContext.lineWidth = 1.5;
        } else {
            this.drawContext.strokeStyle = "green";
            this.drawContext.lineWidth = 2;
        }
        if (shape.shapeType == Prisma.ShapeType.RECTANGLE) {
            const width = this.getX((shape.shapeProperties as IShapeProperties).endPointX) - this.getX((shape.shapeProperties as IShapeProperties).startPointX);
            const height = this.getY((shape.shapeProperties as IShapeProperties).endPointY) - this.getY((shape.shapeProperties as IShapeProperties).startPointY);
            this.drawContext.strokeRect(this.getX((shape.shapeProperties as IShapeProperties).startPointX), this.getY((shape.shapeProperties as IShapeProperties).startPointY), width, height);
        } else if (shape.shapeType == Prisma.ShapeType.CIRCLE) {
            const diameterX = ((shape.shapeProperties as IShapeProperties).endPointX - (shape.shapeProperties as IShapeProperties).startPointX) * 0.5;
            const diameterY = ((shape.shapeProperties as IShapeProperties).endPointY - (shape.shapeProperties as IShapeProperties).startPointY) * 0.5;
            const centerX = (shape.shapeProperties as IShapeProperties).startPointX + diameterX;
            const centerY = (shape.shapeProperties as IShapeProperties).startPointY + diameterY;
            const adjacentL = Math.abs(centerY - (shape.shapeProperties as IShapeProperties).startPointY);
            const hypotenuse = Math.abs(diameterX) > Math.abs(diameterY) ? diameterX : diameterY;
            const angle = Math.acos(adjacentL / hypotenuse);
            this.drawContext.beginPath();
            this.drawContext.ellipse(this.getX(centerX), this.getY(centerY), Math.abs(diameterX), Math.abs(diameterY), angle, 0, 2 * Math.PI);
            this.drawContext.stroke();
        } else if (shape.shapeType == Prisma.ShapeType.LINE) {
            this.drawContext.beginPath();
            this.drawContext.moveTo(this.getX((shape.shapeProperties as IShapeProperties).startPointX), this.getY((shape.shapeProperties as IShapeProperties).startPointY));
            this.drawContext.lineTo(this.getX((shape.shapeProperties as IShapeProperties).endPointX), this.getY((shape.shapeProperties as IShapeProperties).endPointY));
            this.drawContext.stroke();
        } else {
            console.log(`Unknow shapeType ${shape.shapeType}`);
        }
    }

    drawCurrShape() {
        this.drawPreShapes();
        this.drawShape(this.currEle, true);
    }

    drawPreShapes() {
        this.drawContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.syncedElements.forEach((element) => {
            this.drawShape(element, false);
        });
    }
}