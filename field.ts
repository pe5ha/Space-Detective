import { Face } from "./draw.js";

class Field{
    private field:Cell[][] = [];
    private objList:FieldObj[] = [];
    constructor (public h:number=5,public w:number=5){
        console.log("initFiel");
		for(let i=0;i<h;i++){
            this.field[i] = [];
			for(let j=0;j<w;j++){
                this.field[i][j] = new Cell();
                //console.log(this.field[i][j]);
            }
        }
        
    }
    move(key:number,obj:FieldObj){
        // console.log("in move");

        switch(key){
            case 37:  // если нажата клавиша влево
                if(obj.fx>0) this.updateObjList(obj,obj.fy,obj.fx-1);
                break;
            case 38:   // если нажата клавиша вверх
                if(obj.fy>0) this.updateObjList(obj,obj.fy-1,obj.fx);
                break;
            case 39:   // если нажата клавиша вправо
                if(obj.fx<this.w-1) this.updateObjList(obj,obj.fy,obj.fx+1);
                break;
            case 40:   // если нажата клавиша вниз
                if(obj.fy<this.h-1) this.updateObjList(obj,obj.fy+1,obj.fx);    
                break;
        }
    }
    updateObjList(obj:FieldObj,fy:number,fx:number) {              // удаление из одной Cell и перенос в другую Cell
            let ind:number = this.field[obj.fy][obj.fx].objList.indexOf(obj);   // поиск индекса первого элемента obj в текущем objList Cell
            console.log(ind);
            if(ind>-1) this.field[obj.fy][obj.fx].objList.splice(ind,1);
            obj.fy = fy; obj.fx = fx;
            this.field[obj.fy][obj.fx].objList.push(obj);
            console.log(this.field);
    }
    addPerson(obj:FieldObj){
        this.objList.push(obj);
        this.field[obj.fy][obj.fx].addPerson(obj); // вызов <Cell>.addPerson
    }
	getField(y:number,x:number){
		return this.field[y][x];
    }
    getFieldAll(){
        return this.field;
    }
}

class Cell {
    public objList:FieldObj[] = [];
    addPerson(obj:FieldObj){
        this.objList.push(obj);
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
    constructor(name:string,field:Field,fy:number,fx:number){
        super(fx,fy);
        this.name = name;
        field.addPerson(this);
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
export{Field,Person,FieldObj, Cell}