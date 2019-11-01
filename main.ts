
initGame();
alert("SPACE DETECTIVE HELLOOOOO");    
mainLoop();
function mainLoop(){

	allMove();
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
	DRAW.
}

class Field{
	static field : Cell[][];
	static initField(){
		for(let i=0;i<5;i++){
			for(let j=0;j<5;j++){
				this.field[i][j] = new Cell();
			}
		}
  }
	static getField():Cell[][]{
		return this.field;
	}
}
class Cell{
  	cell : number = 0;
}