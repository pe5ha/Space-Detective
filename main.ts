import { Field } from "./field.js";

import { DRAW } from "./draw.js";

let canv = document.getElementById('canvas');
let mainctx = canv.getContext('2d');
initGame();
alert("SPACE DETECTIVE HELLOOOOO");    
mainLoop();
function mainLoop(){

	allMove();//комментарий для теста на гитхабе
	allAction();
	allDraw();
	requestAnimationFrame(mainLoop);
}





function initGame(){
  	Field.initField();
}

function allMove(){

}
function allAction(){

}
function allDraw(){
	DRAW.drawField(mainctx);
}
