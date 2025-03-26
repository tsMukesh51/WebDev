import { Prisma } from "@repo/db/client"
import { Dispatch, SetStateAction } from "react";
import { randomUUID } from "crypto";

type IShapeProperties = {
    startPointX: number,
    startPointY: number,
    endPointX: number,
    endPointY: number
}

interface IDrawer {
    canvas: HTMLCanvasElement;
    socket: WebSocket,
    board: Prisma.Board,
    userId?: string
}

interface sElements extends Partial<Prisma.Element> {
    shapeProperties?: IShapeProperties;
    localId?: string;
}

export class Drawer {
    ws: WebSocket;
    board: Prisma.Board;
    canvas: HTMLCanvasElement;
    drawContext: CanvasRenderingContext2D;
    isDrawing = false;
    syncedElements: sElements[] = [];
    drawnElements: sElements[] = [];
    currEle: sElements = {};
    userId: string = "";

    constructor({ canvas, socket, board, userId }: IDrawer) {
        this.canvas = canvas;
        this.ws = socket
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
        this.userId = userId!;

        // bug when joining, if shape is added will be missed.
        this.ws.onmessage = (message) => {
            this.pushMessageHandler(message);
        }
        // this.ws.send(JSON.stringify({
        //     msgType: 'SHAPE',
        //     eleType: 'ADD',
        //     element: this.currEle
        // }));

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

    pushMessageHandler(msg: MessageEvent<any>) {
        const receivedMsg = JSON.parse(msg.data);
        console.log(`message received`, receivedMsg);
        if (receivedMsg.msgType == "SHAPE") {
            if (receivedMsg.eleType == "ADD") {
                this.drawnElements.splice(this.drawnElements.findIndex((el) => { el.localId == receivedMsg.element.localId }), 1);
                this.syncedElements.push(receivedMsg.element);
                this.drawPreShapes();
            }
        }
    }

    mouseDownHandler(evt: MouseEvent) {
        if (this.isDrawing == false) {
            this.currEle.shapeProperties!.startPointX = this.getVirtX(evt.clientX);
            this.currEle.shapeProperties!.startPointY = this.getVirtY(evt.clientY);
        }
        this.isDrawing = true;
    }
    mouseMoveHandler(evt: MouseEvent) {
        if (this.isDrawing) {
            // console.log(evt);
            this.currEle.shapeProperties!.endPointX = this.getVirtX(evt.clientX);
            this.currEle.shapeProperties!.endPointY = this.getVirtY(evt.clientY);
            this.drawCurrShape();
        }
    }
    mouseUpHandler(evt: MouseEvent) {
        this.isDrawing = false;
        this.currEle.shapeProperties!.endPointX = this.getVirtX(evt.clientX);
        this.currEle.shapeProperties!.endPointY = this.getVirtY(evt.clientY);
        const newEle = {
            ...this.currEle,
            shapeProperties: { ...this.currEle.shapeProperties as IShapeProperties },
            localId: `${this.userId}-${Math.random()}`
        };
        console.log(newEle);
        this.ws.send(JSON.stringify({
            msgType: 'SHAPE',
            eleType: 'ADD',
            element: newEle
        }));
        this.drawnElements.push(newEle);
        // console.log(this.presentElements);
        this.drawPreShapes();

    }

    loadOldElements(elements: sElements[]) {

    }

    selectShape(shape: Prisma.ShapeType) {
        this.currEle.shapeType = shape;
    }

    drawShape(shape: sElements, isTemp: boolean) {
        if (isTemp) {
            this.drawContext.strokeStyle = "#DCDCDC";
            this.drawContext.lineWidth = 1.5;
        } else {
            this.drawContext.strokeStyle = "green";
            this.drawContext.lineWidth = 2;
        }
        if (shape.shapeType == Prisma.ShapeType.RECTANGLE) {
            const width = this.getX(shape.shapeProperties!.endPointX) - this.getX(shape.shapeProperties!.startPointX);
            const height = this.getY(shape.shapeProperties!.endPointY) - this.getY(shape.shapeProperties!.startPointY);
            this.drawContext.strokeRect(this.getX(shape.shapeProperties!.startPointX), this.getY(shape.shapeProperties!.startPointY), width, height);
        } else if (shape.shapeType == Prisma.ShapeType.CIRCLE) {
            const diameterX = (shape.shapeProperties!.endPointX - shape.shapeProperties!.startPointX) * 0.5;
            const diameterY = (shape.shapeProperties!.endPointY - shape.shapeProperties!.startPointY) * 0.5;
            const centerX = shape.shapeProperties!.startPointX + diameterX;
            const centerY = shape.shapeProperties!.startPointY + diameterY;
            const adjacentL = Math.abs(centerY - shape.shapeProperties!.startPointY);
            const hypotenuse = Math.abs(diameterX) > Math.abs(diameterY) ? diameterX : diameterY;
            const angle = Math.acos(adjacentL / hypotenuse);
            this.drawContext.beginPath();
            this.drawContext.ellipse(this.getX(centerX), this.getY(centerY), Math.abs(diameterX), Math.abs(diameterY), angle, 0, 2 * Math.PI);
            this.drawContext.stroke();
        } else if (shape.shapeType == Prisma.ShapeType.LINE) {
            this.drawContext.beginPath();
            this.drawContext.moveTo(this.getX(shape.shapeProperties!.startPointX), this.getY(shape.shapeProperties!.startPointY));
            this.drawContext.lineTo(this.getX(shape.shapeProperties!.endPointX), this.getY(shape.shapeProperties!.endPointY));
            this.drawContext.stroke();
        } else {
            console.log(`Unknow shapeType ${shape.shapeType}`);
        }
    }

    drawCurrShape() {
        this.drawPreShapes();
        if (this.isDrawing)
            this.drawShape(this.currEle, true);
    }

    drawPreShapes() {
        this.drawContext.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.syncedElements.forEach((element) => {
            this.drawShape(element, false);
        });
        this.drawnElements.forEach((element) => {
            this.drawShape(element, true);
        });
    }
}