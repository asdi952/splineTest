

export interface Curves{
    addPoint(x:number, y:number):void
    draw():void
}
export function magnitude( a: {x:number, y:number}, b: {x:number, y:number}){
    return Math.sqrt(Math.pow(b.x - a.x,2) + Math.pow(b.y-a.y,2))
}
