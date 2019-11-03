import { Field, Person } from "./field.js";
import { DRAW } from "./draw.js";
let canv = document.getElementById('canvas');
let mainctx = canv.getContext('2d');
let mainField;
let Player;
initGame();
//alert("SPACE DETECTIVE HELLOOOOO");    
mainLoop();
function mainLoop() {
    allMove(); //комментарий для теста на гитхабе
    allAction();
    allDraw();
    requestAnimationFrame(mainLoop);
}
function initGame() {
    mainField = new Field();
    Player = new Person("Player1", mainField, 1, 2);
    console.log(mainField.getField(1, 2));
}
function allMove() {
}
function allAction() {
}
function allDraw() {
    DRAW.drawField(mainctx);
}
//# sourceMappingURL=main.js.map