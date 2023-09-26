
<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { Bezier2p } from "./bezierPol";
    import { Bspline } from "./bspline";
    import type { Curves } from "./common";
    import { Bspline_sum } from "./bpline_sum";
    import { BsplineMy } from "./bspline_my";
    import { SplineChanfer } from "./splineChanfer";
    import { SplineChanfer2 } from "./splineChanfer2";
    import { SplineChanfer3 } from "./splineChanfer3";

    const buttons = [
        {text: "bezier 2p", curve: Bezier2p,},
        {text:"b-spline", curve: Bspline,},
        {text:"b-spline_sum", curve: Bspline_sum,},
        {text:"splineChanfer", curve: SplineChanfer,},
        {text:"splineChanfer2", curve: SplineChanfer2,},
        {text:"splineChanfer3", curve: SplineChanfer3,},
    ]
    let buttonSelected = 0
    let canvas: HTMLCanvasElement
    let ctx: CanvasRenderingContext2D 

    function init(){
        ctx = canvas.getContext("2d")!
        canvas.addEventListener("mousedown",onPressed)
    }
    
    function destroy(){
        // canvas.removeEventListener("mousedown", onPressed)
    }
    onMount(()=>{
        init()
        onEnter()
    })
    onDestroy(()=>{
        console.log("asd");
        
        destroy()
    })
    
    let curves = []
    let curCurve: Curves
    //--------------------------------------------------------
    function onEnter(){
        curCurve = new buttons[buttonSelected].curve( ctx)
        curves.push(curCurve)
    }
    function onPressed(e: any){
        console.log(e)
        // console.log(e.clientX, e.clientY)
        
        ctx.clearRect(0,0,canvas.width,canvas.height);
        curCurve.addPoint(e.offsetX, e.offsetY)
        curCurve.draw()
    }

    //--------------------------------------------------------
    function changeCurve( index:number){
        if( buttonSelected == index) return
        buttonSelected = index
        onEnter()
    }
    


</script>
<div class=" m-auto h-fit w-[700px]">
    <div class=" bg-gray-200 p-2 mt-10">
        <div class="w-full h-fit flex flex-row gap-1 bg-blue-300 p-[5px] pb-[2px] px-4 ">
             {#each buttons as but,i}
                <button class="border-2 p-1 px-2 border-amber-400 bg-gray-400 hover:bg-gray-500 " 
                class:bg-blue-400={i == buttonSelected}
                class:border-gray-300={i == buttonSelected}
                on:click={()=> changeCurve(i)}
                >{but.text}</button>
             {/each}
        </div>
        <hr class="bg-purple-500  py-[2px] mb-1">
        <div class="border-2 border-blue-400">
            <canvas class="m-auto " bind:this={canvas} width=680 height=600></canvas>
        </div>
    </div>
</div>