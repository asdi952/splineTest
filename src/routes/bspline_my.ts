import type { Curves } from "./common"


export class BsplineMy implements Curves{
    points:Array<{x:number, y: number}> = []
    dPoints:Array<{x:number, y: number}> = []
    ctx: CanvasRenderingContext2D 

    constructor(ctx: CanvasRenderingContext2D){
        this.ctx = ctx
    }
    addPoint(x:number,y:number):void{
        this.points.push({x,y})
    }
   
    getSplineType3(splitN:number, t:number){
        const res = {x:0,y:0}
        const minusT = (1-t)
        res.x = 0.5 * ( this.points[splitN].x * minusT + this.points[splitN+1].x + this.points[splitN+2].x*t ) 
        res.y = 0.5 * ( this.points[splitN].y * minusT + this.points[splitN+1].y + this.points[splitN+2].y*t ) 
        return res
    }

    drawSpline(){

        if( this.points.length < 2) return
        
        const step = 1 / 40;
        for( let i = 0; i <this.points.length - 2; i++){
            for( let k = 0; k < 40; k++){
                this.dPoints.push(this.getSplineType3(i, k*step))
            }
        }
        
        this.ctx.beginPath()
        for( let i = 0; i < this.dPoints.length; i++){
            this.ctx.strokeStyle = "purple"
            this.ctx.lineTo(this.dPoints[i].x, this.dPoints[i].y)
            // this.ctx.fillStyle = "purple"
            // this.ctx.rect(this.dPoints[i].x, this.dPoints[i].y, 4, 4)
        }
        this.ctx.stroke()
    }
    drawPoints(){
        this.ctx.beginPath()
        const size = 6
        this.ctx.fillStyle = "blue"
        for( let i = 0; i < this.points.length; i++){
            this.ctx.rect(this.points[i].x, this.points[i].y, size, size)
        }
        this.ctx.fill()
    }

    draw(){
        this.drawSpline()
        this.drawPoints()
    }
}