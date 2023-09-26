import { magnitude, type Curves } from "./common"


export class Bspline implements Curves{
    points:Array<{x:number, y: number}> = []
    dPoints:Array<{x:number, y: number}> = []
    ctx: CanvasRenderingContext2D 

    constructor(ctx: CanvasRenderingContext2D){
        this.ctx = ctx
    }
    addPoint(x:number,y:number):void{
        this.points.push({x,y})
    }
    getSplineType0(splitN:number, t:number){
        const res = {x:0, y:0}
        const c0 = (1-t)
        const c1 = t
       
        res.x = this.points[splitN].x * c0 + this.points[splitN+1].x * c1 
        res.y = this.points[splitN].y * c0 + this.points[splitN+1].y * c1 
        return res
    }
    getSplineType1(splitN:number, t:number){
        const res = {x:0, y:0}
        const c0 = (1-t)*0.6 + 0.2 
        const c1 = t*0.6
        const c2 = t*0.2
        res.x = this.points[splitN].x * c0 + this.points[splitN+1].x * c1 + this.points[splitN+2].x * c2
        res.y = this.points[splitN].y * c0 + this.points[splitN+1].y * c1 + this.points[splitN+2].y * c2
        return res
    }
    getSplineType2(splitN:number, t:number){
        const res = {x:0, y:0}
        const c0 = (1-t)*0.6 
        const c1 = t*0.6
        const c2 = t*0.6 + 0.2
        res.x = this.points[splitN-1].x * c0 + this.points[splitN].x * c1 + this.points[splitN+1].x * c2
        res.y = this.points[splitN-1].y * c0 + this.points[splitN].y * c1 + this.points[splitN+1].y * c2
        return res
    }
    getSplineType3(splitN:number, t:number){
        const res = {x:0, y:0}
        const c0 = Math.pow((1-t), 1)*0.2
        const c1 = Math.pow((1-t)*0.4, 1) + 0.2
        const c2 = Math.pow(t, 1)*0.4 + 0.2
        const c3 = Math.pow(t,1)*0.2
        res.x = this.points[splitN-1].x * c0 + this.points[splitN].x * c1 + this.points[splitN+1].x * c2 + this.points[splitN+2].x * c3 
        res.y = this.points[splitN-1].y * c0 + this.points[splitN].y * c1 + this.points[splitN+1].y * c2 + this.points[splitN+2].y * c3 
        return res
    }

    drawSpline(){
        const pixelsPerPoint = 5
        let rest = 0

        if(this.points.length < 2) return
        else if(this.points.length == 2){
            let numPoints = (magnitude(this.points[1], this.points[0]) + rest) / pixelsPerPoint
            if(numPoints < 2)
                numPoints = 2

            for(let i = 0; i < numPoints; i++){
            const step = 1 / numPoints
                const point = this.getSplineType0(0, pixelsPerPoint * i)
                this.dPoints.push( point)
            }
            rest = 0
        }else{
            for(let i = 0; i < this.points.length - 1; i++){
                if(i == 0){
                    // const mag = magnitude(this.points[i+1], this.points[i]) 
                    // let numPoints = (mag - rest) / pixelsPerPoint

                    // let len = 0
                    // for(let k = 0; k < numPoints; k++){
                    //     len = k * pixelsPerPoint + rest
                    //     this.dPoints.push( this.getSplineType1(0, len / mag))
                    // }
                    // rest = pixelsPerPoint - (mag - len)
                }else if( i == this.points.length - 2){
                    // const mag = magnitude(this.points[i + 1], this.points[i]) 
                    // let numPoints = (mag - rest) / pixelsPerPoint

                    // let len = 0
                    // for(let k = 0; k < numPoints; k++){
                    //     len = k * pixelsPerPoint + rest
                    //     this.dPoints.push( this.getSplineType2(i, len / mag))
                    // }
                    // rest = pixelsPerPoint - (mag - len)
                }else{
                    const mag = magnitude(this.points[i + 1], this.points[i]) 
                    let numPoints = (mag - rest) / pixelsPerPoint

                    let len = 0
                    for(let k = 0; k < numPoints; k++){
                        len = k * pixelsPerPoint + rest
                        this.dPoints.push(this.getSplineType3(i, len / mag))
                    }
                    rest = pixelsPerPoint - (mag - len)
                }
            }
        }

        this.ctx.beginPath()
        for( let i = 0; i < this.dPoints.length; i++){
            // this.ctx.lineTo(this.dPoints[i].x, this.dPoints[i].y)
            this.ctx.fillStyle = "purple"
            this.ctx.rect(this.dPoints[i].x, this.dPoints[i].y, 4, 4)
        }
        this.ctx.stroke()
    }
    drawPoints(){
        this.ctx.beginPath()
        const size = 3
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