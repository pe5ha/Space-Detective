import { Face } from "./draw.js";

class Field{
    private field:Square[][] = [];
    private objList = [];
    constructor (public h:number=5,public w:number=5){
        console.log("initFiel");
		for(let i=0;i<h;i++){
            this.field[i] = [];
			for(let j=0;j<w;j++){
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
    public objList:FieldObj[] = [];
    addPerson(person:Person){
        this.objList[this.objList.length]=person;
    }
}

class FieldObj{
    color:string;
    face:Face = new Face(this);
    constructor(public fx:number,public fy:number){
        this.color=getRndClr();
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
export{Field,Person,FieldObj, Square}