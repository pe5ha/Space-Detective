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
    console.log(mainField.getFieldAll());
    function keyPress(e) {
        if (37 <= e.keyCode && e.keyCode <= 40)
            mainField.move(e.keyCode, Player);
    }
    addEventListener("keydown", keyPress); // слушатель клавиатуры
}
function allMove() {
}
function allAction() {
    //console.log('af');
}
function allDraw() {
    // console.log('af');
    DRAW.drawField(mainctx);
}
export { mainField };
//# sourceMappingURL=main.js.map