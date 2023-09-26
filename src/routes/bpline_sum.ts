import type { Curves } from "./common"


export class Bspline_sum implements Curves{
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

    setupBezier( order: number){
        this.coeficients = []

        let eq0 = 1
        let eq1 = 1
        this.coeficients.push(1)

        for( let i = 1; i <= Math.floor(order / 2); i++){
            eq0 *= (order - i + 1)
            eq1 *= i 
            this.coeficients.push( eq0 / eq1)
        }
    }

    getBezierPoint(t: number){
        const res = {x:0,y:0}
        
        let i = 0, k = 0;
        for(; i < Math.floor((this.points.length - 1) / 2); i++, k++){
            res.x += Math.pow(t, i) * Math.pow(1-t, this.points.length -1 - i) * this.coeficients[k] * this.points[i].x
            res.y += Math.pow(t, i) * Math.pow(1-t, this.points.length -1 - i) * this.coeficients[k] * this.points[i].y
        }
        if( this.points.length % 2 == 1){
            k--
        }
        i++

        for(; i < this.points.length; i++, k--){
            res.x += Math.pow(t, i) * Math.pow(1-t, this.points.length -1 - i) * this.coeficients[k] * this.points[i].x
            res.y += Math.pow(t, i) * Math.pow(1-t, this.points.length -1 - i) * this.coeficients[k] * this.points[i].y
        }
        
        return res
    }

    drawBezier(){
        if(this.points.length < 2) return

        this.dPoints = []
        const size = 1000
        const step = 1 / size

        for( let i = 0; i < size; i++){
            this.dPoints.push(this.getBezierPoint(i*step))
        }

        this.ctx.beginPath()

        for( let i = 0; i < size; i++){
            this.ctx.lineTo(this.dPoints[i].x, this.dPoints[i].y)
        }
        this.ctx.stroke()
        
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
        this.setupBezier( this.points.length - 1)
        this.drawBezier()
        this.drawPoints()
    }
}