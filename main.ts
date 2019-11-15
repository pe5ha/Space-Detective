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




let tb,tb2;
function initGame(){
	mainField = new Field(24,10);
	player = new Person("Player1",mainField,0,0);
	new Person("Bob", mainField, 2,2);
	new Person("Bobson", mainField, 3,4);
	new Person("Bob2", mainField, 4,4);
	DRAW.init(canv.width,canv.height);
	console.log(mainField.getFieldAll());

	function keyPress(e:any) {
		if (37 <= e.keyCode && e.keyCode <= 40) mainField.move(e.keyCode,player);
		if(e.key==' '){
			DRAW.remTextBox(tb);
			DRAW.remTextBox(tb2);
			tb = DRAW.createDialogWin("hasf hasf haaaasf",3,4);
			tb2 = DRAW.createDialogWin("hasf hasf afgadfra g gtg aerg ahaaaasf",5,5);
		}
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