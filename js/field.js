import { Face } from "./draw.js";
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
                this.field[i][j] = new Square();
                console.log(this.field[i][j]);
            }
        }
    }
    addPerson(person, x, y) {
        this.objList[this.objList.length] = person;
        this.field[y][x].addPerson(person);
    }
    getField(x, y) {
        return this.field[y][x];
    }
}
class Square {
    constructor() {
        this.objList = [];
    }
    addPerson(person) {
        this.objList[this.objList.length] = person;
    }
}
class FieldObj {
    constructor(fx, fy) {
        this.fx = fx;
        this.fy = fy;
        this.face = new Face(this);
        this.color = getRndClr();
    }
}
class Person extends FieldObj {
    constructor(name, field, x, y) {
        super(x, y);
        this.name = name;
        field.addPerson(this, x, y);
    }
}
class Objects {
    constructor(solid = false) {
        this.solid = solid;
    }
}
function getRndClr() {
    let n = ~~(Math.random() * 0xffffff);
    let clr = n.toString(16);
    while (clr.length < 6)
        clr = "0" + clr;
    return "#" + clr;
}
export { Field, Person, FieldObj, Square };
//# sourceMappingURL=field.js.map