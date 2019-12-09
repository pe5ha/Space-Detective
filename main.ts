import { drawRandomPoints, initRandomPoints } from "./randompoints.js";
import { initApolloBalls, drawApolloBalls } from "./apolloballs1.js";


export let canv:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
initCanvas(canv);
export let mainctx = canv.getContext('2d');
init();

// let testc=document.createElement("canvas");
// let tctx = testc.getContext('2d');
// testc.width=500;
// testc.height=500;
// let abc=[250,0,0,433,500,433], xy={x:250,y:216};
// let abc=[0,0,500,0,500,500,0,500], xy={x:0,y:0};
// let abc=[50,0,450,0,500,250,250,500,0,250], xy={x:0,y:0};
	

export var bgclr="#000000";

mainctx.fillStyle=bgclr;
mainctx.fillRect(0,0,canv.width,canv.height);
mainLoop();

function mainLoop(){
	// drawRandomPoints();
	drawApolloBalls();
	requestAnimationFrame(mainLoop);
}

function init(){
	// initRandomPoints();
	initApolloBalls();
}

export function drawCircle(ctx:CanvasRenderingContext2D,x,y,r,clr=null,stroke:number=0){
	if(clr)ctx.fillStyle=ctx.strokeStyle=clr;
	ctx.beginPath();
	ctx.arc(x,y,r,0,6.29);
	ctx.lineWidth=stroke;
	if(stroke>0)ctx.stroke(); else ctx.fill();
};

function initCanvas(canv:HTMLCanvasElement){
	canv.width=window.innerWidth-5;
	canv.height=window.innerHeight-5;
}

export function getRndClr():string{
    var n=~~(Math.random()*0xffffff),res=(~~n).toString(16);
    while(res.length<6)res="0"+res;
	return "#"+res;
}