import { Field, Person, getRndClr } from "./field.js";
import { DRAW } from "./draw.js";

let canv:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
let mainctx = canv.getContext('2d');
let mainField : Field;
let player : Person;

initCanvas(canv);	
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
	DRAW.drawField(mainctx);
}


export {mainField, player};