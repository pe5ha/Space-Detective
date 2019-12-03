import { Field, Person } from "./field.js";
import { DRAW, PixiRenderer } from "./draw.js";
import { initBrain } from "./brain.js";
export let canv = document.getElementById('canvas');
let mainctx = canv.getContext('2d');
export let stepN = 0, deltaTime = { last: 0, delta: 0 }; //No. of iteration of main loop
let mainField;
let player;
initCanvas(canv);
//alert("SPACE DETECTIVE HELLOOOOO");    
//lets load all our images in PIXI
PixiRenderer.init();
PixiRenderer.addUrl("img/otus.json");
PixiRenderer.addUrl("img/alph.json");
PixiRenderer.addUrl("img/gawk.json");
PixiRenderer.addUrl("img/ggawk.json");
PixiRenderer.addUrl("img/tiles.jpg");
let waiter = PixiRenderer.load();
//we need to wait for it to load now
loadingWaiter(continueStart, waiter); //  MAIN LOOP START
//this is what we call after all imgs are loaded
function continueStart() {
    initGame();
    console.log('gStart ending.. starting Main Loop.');
    mainLoop();
}
function mainLoop() {
    allMove(); //комментарий для теста на гитхабе
    allAction();
    allDraw();
    requestAnimationFrame(mainLoop);
    updateStepCounters();
    function updateStepCounters() {
        if (true)
            stepN++;
        let n = Date.now();
        deltaTime.delta = n - deltaTime.last;
        deltaTime.last = n;
    }
}
let tb, tb2;
function initGame() {
    mainField = new Field(24, 10);
    player = new Person("Player", mainField, 0, 0);
    // new Person(names[0], mainField, 2,2);
    // new Person(names[1], mainField, 3,4);
    DRAW.init(canv.width, canv.height);
    // console.log(mainField.getFieldAll());
    initBrain();
    function keyPress(e) {
        if (37 <= e.keyCode && e.keyCode <= 40)
            mainField.move(e.keyCode, player);
        if (e.key == ' ') {
            DRAW.remTextBox(tb);
            DRAW.remTextBox(tb2);
            tb = DRAW.createDialogWin("hasf hasf haaaasf", 3, 4);
            tb2 = DRAW.createDialogWin("hasf hasf afgadfra g gtg aerg ahaaaasf", 5, 5);
        }
    }
    addEventListener("keydown", keyPress); // слушатель клавиатуры
}
function initCanvas(canv) {
    canv.width = window.innerWidth - 5;
    canv.height = window.innerHeight - 5;
}
function allMove() {
}
function allAction() {
    //console.log('af');
}
function allDraw() {
    DRAW.drawField(mainctx);
}
//It waits and draws loading screen
function loadingWaiter(callBack, waiter) {
    let ang = 0, lx = canv.width / 2, ly = canv.height / 2;
    mainctx.strokeStyle = '#449933';
    mainctx.lineWidth = 5;
    loading();
    function loading() {
        // console.log('loading in progress... time '+(now()-begTime));
        if (waiter.complete)
            callBack();
        else {
            mainctx.beginPath();
            mainctx.clearRect(lx - 50, ly - 50, 100, 100);
            mainctx.arc(lx, ly, 40, ang / 2, ang, ang > 12.56);
            mainctx.stroke();
            ang = (waiter.loaded / (waiter.all || 1)) * 25.12 * 1 % 25.12; //(ang+.1)%25.12;
            setTimeout(loading, 5);
        }
    }
}
export { mainField, player, initCanvas };
//# sourceMappingURL=main.js.map