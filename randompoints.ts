import { getRndClr, canv, drawCircle, mainctx, bgclr } from "./main.js";

let step, n, ptr, clr, speed, size, fadingOn;
let abc, xy,ast, speedsum;
let drawThingie;
    


export function initRandomPoints(){
    // PARAMETERS:
    // step = 1/2; n=3; ptr=.0; clr='#ffffff'; speed=.1; size=10; fadingOn=false;//mystery shape
    step = 1/2; n=6; ptr=.0; clr=getRndClr()+"77"; speed=1000; size=1; fadingOn=false;//snowflower
    // step = 1/3; n=3; ptr=.0; clr=getRndClr()+"77"; speed=1000; size=1; fadingOn=true;//radioactive
    // step = 1/2; n=5; ptr=.0; clr=getRndClr()+"77"; speed=1000; size=5; fadingOn=true;//


    abc=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]; xy={x:canv.width/2,y:canv.height/2};ast=Math.random()*6.29; speedsum=0;
    // abc.forEach((a,i,arr)=>{arr[i]=Math.random()*((i%2)?canv.height:canv.width)});
    abc.forEach((a,i,arr)=>{arr[i]=((i%2)?canv.height*(.5+.5*Math.sin(ast+ptr*Math.random()+6.29*(i-1)/2/n)):canv.width*(.5+.5*Math.cos(ast+ptr*Math.random()+6.29*(i)/2/n)))});
    drawThingie = (size>3)?(x,y)=>{drawCircle(mainctx,x,y,size/2);}:(x,y)=>{mainctx.fillRect(x,y,size,size);};
}

export function drawRandomPoints(){
	// DRAW.drawField(mainctx);
	mainctx.fillStyle=clr;
	while(speedsum>0){
		makeStep(n);
		speedsum--;
	}
	speedsum+=speed;
	if(fadingOn){
		mainctx.fillStyle=bgclr+"01";
		mainctx.fillRect(0,0,canv.width,canv.height);
	}

	function makeStep(n:number){
		let r=~~(Math.random()*n);
		xy=goto(xy,abc[r*2],abc[r*2+1],step);
		drawThingie(xy.x,xy.y);
	}
	function goto(xy,x,y,a=.5){
		return {x:xy.x+(x-xy.x)*a,y:xy.y+(y-xy.y)*a};
	}
	
}