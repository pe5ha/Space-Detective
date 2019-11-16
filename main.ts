import { Field, Person, getRndClr } from "./field.js";
import { DRAW } from "./draw.js";

let canv:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
let mainctx = canv.getContext('2d');
let mainField : Field;
let player : Person;

let testc=document.createElement("canvas");
let tctx = testc.getContext('2d');
testc.width=500;
testc.height=500;
// let abc=[250,0,0,433,500,433], xy={x:250,y:216};
// let abc=[0,0,500,0,500,500,0,500], xy={x:0,y:0};
// let abc=[50,0,450,0,500,250,250,500,0,250], xy={x:0,y:0};

initCanvas(canv);	

// PARAMETERS:
let bgclr="#000000";
let step = 1/2, n=3, ptr=.0, clr='#ffffff', speed=.1, size=10, fadingOn=false;//mystery shape
// let step = 1/2, n=6, ptr=.0, clr=getRndClr()+"77", speed=1000, size=1, fadingOn=false;//snowflower
// let step = 1/3, n=3, ptr=.0, clr=getRndClr()+"77", speed=1000, size=1, fadingOn=true;//radioactive
// let step = 1/2, n=5, ptr=.0, clr=getRndClr()+"77", speed=1000, size=5, fadingOn=true;//

let abc=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], xy={x:canv.width/2,y:canv.height/2},ast=Math.random()*6.29, speedsum=0;
// abc.forEach((a,i,arr)=>{arr[i]=Math.random()*((i%2)?canv.height:canv.width)});
abc.forEach((a,i,arr)=>{arr[i]=((i%2)?canv.height*(.5+.5*Math.sin(ast+ptr*Math.random()+6.29*(i-1)/2/n)):canv.width*(.5+.5*Math.cos(ast+ptr*Math.random()+6.29*(i)/2/n)))});

let drawThingie = (size>3)?(x,y)=>{drawCircle(mainctx,x,y,size/2);}:(x,y)=>{mainctx.fillRect(x,y,size,size);};

mainctx.fillStyle=bgclr;
mainctx.fillRect(0,0,canv.width,canv.height);
initGame();
//alert("SPACE DETECTIVE HELLOOOOO");    
mainLoop();

function mainLoop(){

	allMove();//комментарий для теста на гитхабе
	allAction();
	allDraw();
	requestAnimationFrame(mainLoop);
}

export function drawCircle(ctx:CanvasRenderingContext2D,x,y,r,clr=null,stroke:number=0){
	if(clr)ctx.fillStyle=ctx.strokeStyle=clr;
	ctx.beginPath();
	ctx.arc(x,y,r,0,6.29);
	ctx.lineWidth=stroke;
	if(stroke>0)ctx.stroke(); else ctx.fill();
};



function initGame(){
	DRAW.init(canv.width,canv.height);
	mainField = new Field(24,10);
	player = new Person("Player1",mainField,0,0);
	console.log(mainField.getFieldAll());

	function keyPress(e:any) {
		if (37 <= e.keyCode && e.keyCode <= 40) mainField.move(e.keyCode,player);
	}
	addEventListener("keydown", keyPress);		// слушатель клавиатуры
}
function initCanvas(canv:HTMLCanvasElement){
	canv.width=window.innerWidth-5;
	canv.height=window.innerHeight-5;
}

function allMove(){

}
function allAction(){
	
	//console.log('af');
	
}
function allDraw(){
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


export {mainField, player};