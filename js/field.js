class Field {
    static initField() {
        console.log("initFiel");
        for (let i = 0; i < 5; i++) {
            this.field[i] = [];
            for (let j = 0; j < 5; j++) {
                this.field[i][j] = new Cell();
            }
        }
    }
    static getField() {
        return this.field;
    }
}
Field.field = [];
class Cell {
    constructor() {
        this.cell = 0;
    }
}
export { Field, Cell };
//# sourceMappingURL=field.js.map