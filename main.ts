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
let step = 1/2, n=6, ptr=.0, clr=getRndClr()+"77";

let abc=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], xy={x:0,y:0},ast=Math.random()*6.29;
// abc.forEach((a,i,arr)=>{arr[i]=Math.random()*((i%2)?canv.height:canv.width)});
abc.forEach((a,i,arr)=>{arr[i]=((i%2)?canv.height*(.5+.5*Math.sin(ast+ptr*Math.random()+6.29*(i-1)/2/n)):canv.width*(.5+.5*Math.cos(ast+ptr*Math.random()+6.29*(i)/2/n)))});


initGame();
//alert("SPACE DETECTIVE HELLOOOOO");    
mainLoop();

function mainLoop(){

	allMove();//комментарий для теста на гитхабе
	allAction();
	allDraw();
	requestAnimationFrame(mainLoop);
}





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
	for(let i=0;i<1000;i++){
		makeStep(n);
	}
	// mainctx.fillStyle="#ffffff01";
	// mainctx.fillRect(0,0,canv.width,canv.height);

	function makeStep(n:number){
		let r=~~(Math.random()*n);
		xy=goto(xy,abc[r*2],abc[r*2+1],step);
		mainctx.fillRect(xy.x,xy.y,1,1);
	}
	function goto(xy,x,y,a=.5){
		return {x:xy.x+(x-xy.x)*a,y:xy.y+(y-xy.y)*a};
	}
	
}


export {mainField, player};