import type { Curves } from "./common"


export class SplineChanfer3 implements Curves{
    points:Array<{x:number, y: number}> = []
    dPoints:Array<{x:number, y: number}> = []
    ctx: CanvasRenderingContext2D 

    coeficients: number[] = []

    constructor(ctx: CanvasRenderingContext2D){
        this.ctx = ctx
    }
    addPoint(x:number,y:number):void{
        this.points.push({x,y})
        
    }

    

    

    drawBezier(){
        if(this.points.length < 4) return
        this.dPoints = []
        
        const step = 1 / 40;
        for( let i = 0; i < this.points.length - 3; i++){
            const cof3 = {
                x: 0.125 * (this.points[i+3].x - 3*this.points[i+2].x + 3*this.points[i+1].x - this.points[i].x),
                y: 0.125 * (this.points[i+3].y - 3*this.points[i+2].y + 3*this.points[i+1].y - this.points[i].y),
            }
            const cof2 = {
                x: 0.75 * (0.5*this.points[i+2].x - this.points[i+1].x + 0.5*this.points[i].x),
                y: 0.75 * (0.5*this.points[i+2].y - this.points[i+1].y + 0.5*this.points[i].y),
            }
            const cof1 = {
                x: 0.625*this.points[i+2].x - 0.25*this.points[i+1].x - 0.375*this.points[i].x,
                y: 0.625*this.points[i+2].y - 0.25*this.points[i+1].y - 0.375*this.points[i].y,
            }
            const cof0 = {
                x: 0.125 * (this.points[i+2].x + this.points[i].x) + 0.75*this.points[i+1].x,
                y: 0.125 * (this.points[i+2].y + this.points[i].y) + 0.75*this.points[i+1].y,
            }

            for( let k = 0; k < 40; k++){
                const t = k*step;
                this.dPoints.push({
                    x: Math.pow(t,3)*cof3.x + Math.pow(t,2)*cof2.x + t*cof1.x + cof0.x,
                    y: Math.pow(t,3)*cof3.y + Math.pow(t,2)*cof2.y + t*cof1.y + cof0.y,
                })
            }
        }

        this.ctx.beginPath()
        for( let i = 0; i < this.dPoints.length - 1; i++){
            this.ctx.lineTo(this.dPoints[i].x, this.dPoints[i].y)
            // this.ctx.rect(this.dPoints[i].x, this.dPoints[i].y, 10, 10)
        }
        this.ctx.stroke();
    }

    drawPoints(){
        this.ctx.beginPath()
        this.ctx.fillStyle = "red"
        const size = 10
        for( let i = 0; i < this.points.length; i++){
            this.ctx.rect(this.points[i].x, this.points[i].y, size, size)
        }
        this.ctx.fill()
    }

    draw(){
        this.drawBezier()
        this.drawPoints()
    }
}