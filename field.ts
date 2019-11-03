
class Field{
    private field:Square[][] = [];
    private objList = [];
    constructor (H:number=5,W:number=5){
        console.log("initFiel");
		for(let i=0;i<H;i++){
            this.field[i] = [];
			for(let j=0;j<W;j++){
                this.field[i][j] = new Square();
                console.log(this.field[i][j]);
            }
        }
        
    }
    addPerson(person:Person,x:number,y:number){
        this.objList[this.objList.length]=person;
        this.field[y][x].addPerson(person);
    }
	getField(x:number,y:number){
		return this.field[y][x];
    }
}

class Square {
    private objList:FieldObj[] = [];
    addPerson(person:Person){
        this.objList[this.objList.length]=person;
    }
}

class FieldObj{
    color:string;
    fx:number; fy:number;
    constructor(x:number,y:number){
        this.color=getRndClr();
        this.fx=x;
        this.fy=y;
    }
}

class Person extends FieldObj{
    private name:string;
    constructor(name:string,field:Field,x:number,y:number){
        super(x,y);
        this.name = name;
        field.addPerson(this,x,y);
    }
}

class Objects{
    constructor(private solid:boolean=false){}

}

function getRndClr() {
    let n = ~~(Math.random()*0xffffff);
    let clr=n.toString(16);
    while(clr.length<6)clr="0"+clr;
    return "#"+clr;
}
export{Field,Person}