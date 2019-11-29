import { Field, Person, getRndClr } from "./field.js";
<<<<<<< HEAD
import { DRAW, PixiRenderer } from "./draw.js";
=======
import { DRAW } from "./draw.js";
<<<<<<< HEAD
import { names, allDialogs } from "./brain.js";
=======
>>>>>>> 5ac0a56246fb98cea435937794dd056e7d18168c
import { names, initBrain } from "./brain.js";
>>>>>>> a1a60b4726cb727a1e27dd5467d30ee99612061e

let canv:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
let mainctx = canv.getContext('2d');
export let stepN:number = 0, deltaTime:{last:number, delta:number} = {last:0, delta:0};   //No. of iteration of main loop
let mainField : Field;
let player : Person;

// initCanvas(canv);
//alert("SPACE DETECTIVE HELLOOOOO");    

//lets load all our images in PIXI
PixiRenderer.init();
PixiRenderer.addJson("img/otus.json");
PixiRenderer.addJson("img/alph.json");
PixiRenderer.addJson("img/gawk.json");
PixiRenderer.addJson("img/ggawk.json");
let waiter = PixiRenderer.load();

//we need to wait for it to load now
loadingWaiter(continueStart, waiter);     //  MAIN LOOP START

//this is what we call after all imgs are loaded
function continueStart(){	
	initGame();
    console.log('gStart ending.. starting Main Loop.');
	mainLoop();
}

function mainLoop(){

	allMove();//комментарий для теста на гитхабе
	allAction();
	allDraw();
	requestAnimationFrame(mainLoop);
	
	updateStepCounters();

    function updateStepCounters(){
        if(true)stepN++;
        let n = Date.now();
        deltaTime.delta = n-deltaTime.last;
        deltaTime.last = n;
    }
}

let tb,tb2;
function initGame(){
	mainField = new Field(24,10);
	player = new Person("Player",mainField,0,0);
	// new Person(names[0], mainField, 2,2);
	// new Person(names[1], mainField, 3,4);
	DRAW.init(canv.width,canv.height);
	// console.log(mainField.getFieldAll());
	initBrain();

	function keyPress(e:any) {
		if (37 <= e.keyCode && e.keyCode <= 40) mainField.move(e.keyCode,player);
		if(e.key==' '){
			DRAW.remTextBox(tb);
			DRAW.remTextBox(tb2);
			tb = DRAW.createDialogWin("hasf hasf haaaasf",3,4);
			tb2 = DRAW.createDialogWin("hasf hasf afgadfra g gtg aerg ahaaaasf",5,5);
		}
	}
	addEventListener("keydown", keyPress);		// слушатель клавиатуры
}
function initCanvas(canv:HTMLCanvasElement){
	canv.width=window.innerWidth-5;
	canv.height=window.innerHeight-5;
}

function allMove(){

}
function allAction(){
	
	//console.log('af');
	
}
function allDraw(){
	DRAW.drawField(mainctx);
}

<<<<<<< HEAD



//It waits and draws loading screen
function loadingWaiter(callBack:Function, waiter:{complete:boolean, loaded:number, all:number}){
    let ang=0, lx=canv.width/2, ly=canv.height/2;
    mainctx.strokeStyle='#449933';
    mainctx.lineWidth = 5;
    loading();
    
    function loading(){
        // console.log('loading in progress... time '+(now()-begTime));
        if(waiter.complete)
        callBack();
        else {
            mainctx.beginPath();
            mainctx.clearRect(lx-50,ly-50,100,100);
            mainctx.arc(lx,ly,40,ang/2,ang, ang>12.56);
            mainctx.stroke();
            ang = (waiter.loaded/(waiter.all||1))*25.12*1%25.12;//(ang+.1)%25.12;
            setTimeout(loading,5);
        }
    }
}

export {mainField, player, initCanvas};
=======
export {mainField, player};
>>>>>>> 5ac0a56246fb98cea435937794dd056e7d18168c
