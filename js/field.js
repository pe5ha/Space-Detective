import { Face, DRAW } from "./draw.js";
class Field {
    constructor(h = 5, w = 5) {
        this.h = h;
        this.w = w;
        this.field = [];
        this.objList = [];
        console.log("initFiel");
        for (let i = 0; i < h; i++) {
            this.field[i] = [];
            for (let j = 0; j < w; j++) {
                this.field[i][j] = new Cell();
                //console.log(this.field[i][j]);
            }
        }
    }
    move(key, obj) {
        // console.log("in move");
        DRAW.remAllTextBoxes();
        switch (key) {
            case 37: // если нажата клавиша влево
                if (obj.fx > 0)
                    this.updateObjList(obj, obj.fy, obj.fx - 1);
                break;
            case 38: // если нажата клавиша вверх
                if (obj.fy > 0)
                    this.updateObjList(obj, obj.fy - 1, obj.fx);
                break;
            case 39: // если нажата клавиша вправо
                if (obj.fx < this.w - 1)
                    this.updateObjList(obj, obj.fy, obj.fx + 1);
                break;
            case 40: // если нажата клавиша вниз
                if (obj.fy < this.h - 1)
                    this.updateObjList(obj, obj.fy + 1, obj.fx);
                break;
        }
    }
    updateObjList(obj, fy, fx) {
        let free = true;
        for (let oo of this.field[fy][fx].objList) {
            if (oo.solid)
                free = false;
            oo.action();
        }
        if (!free)
            return;
        let ind = this.field[obj.fy][obj.fx].objList.indexOf(obj); // поиск индекса первого элемента obj в текущем objList Cell
        console.log(ind);
        if (ind > -1)
            this.field[obj.fy][obj.fx].objList.splice(ind, 1);
        obj.fy = fy;
        obj.fx = fx;
        this.field[obj.fy][obj.fx].objList.push(obj);
        console.log(this.field);
    }
    addPerson(obj) {
        this.objList.push(obj);
        this.field[obj.fy][obj.fx].addPerson(obj); // вызов <Cell>.addPerson
    }
    getField(y, x) {
        if (y < 0 || x < 0 || y >= this.h || x >= this.w)
            return null;
        return this.field[y][x];
    }
    getFieldAll() {
        return this.field;
    }
}
class Cell {
    constructor() {
        this.objList = [];
    }
    addPerson(obj) {
        this.objList.push(obj);
    }
}
class FieldObj {
    constructor(fx, fy) {
        this.fx = fx;
        this.fy = fy;
        this.face = new Face(this);
        this.solid = true;
        this.color = getRndClr();
    }
    action() {
        console.log('action');
    }
}
class Person extends FieldObj {
    constructor(name, field, fy, fx) {
        super(fx, fy);
        this.brain = { act: () => {
                if (this.txtbox) {
                    DRAW.remTextBox(this.txtbox);
                    this.txtbox = null;
                }
                DRAW.createDialogWin("Hi, my name is " + this.name, this.fx, this.fy - 1);
            } };
        this.name = name;
        field.addPerson(this);
    }
    action() {
        this.brain.act();
    }
}
class Objects {
    constructor(solid = false) {
        this.solid = solid;
    }
}
export function getRndClr() {
    let n = ~~(Math.random() * 0xffffff);
    let clr = n.toString(16);
    while (clr.length < 6)
        clr = "0" + clr;
    return "#" + clr;
}
export { Field, Person, FieldObj, Cell };
//# sourceMappingURL=field.js.map