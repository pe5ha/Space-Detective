import { Field, Person, Player } from "./field.js";
import { DRAW } from "./draw.js";

let canv:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
let mainctx = canv.getContext('2d');
let mainField : Field;
let player : Player;
let keyboard : any = {};

initGame();
//alert("SPACE DETECTIVE HELLOOOOO");    
mainLoop();

function mainLoop(){

	
	allMove();
	allAction();
	allDraw();
	// requestAnimationFrame(mainLoop);
	setTimeout(mainLoop,10);
}





function initGame(){
	mainField = new Field(20,20);
	player = new Player("Player1",mainField,1,2);
	console.log(mainField.getFieldAll());



	





	function keyPress(e:any) {
		keyboard[e.key]=true;
	}
	function keyUp(e:any) {
		keyboard[e.key]=false;
	}
	addEventListener("keydown", keyPress);		// слушатель клавиатуры
	addEventListener("keyup", keyUp);
}

function allMove(){
	player.move();

}
function allAction(){
	
	//console.log('af');
	
}
function allDraw(){
	// console.log('af');
	DRAW.drawField(mainctx,0,0,canv.width,canv.height);
}

export {mainField,keyboard};