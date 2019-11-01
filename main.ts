alert("SPACE DETECTIVE HELLOOOOO");    

initGame();




function initGame(){
  	Field.initField();
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