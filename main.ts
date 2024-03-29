import { Field, Person, getRndClr } from "./field.js";
import { DRAW, PixiRenderer } from "./draw.js";
import { names, initBrain } from "./brain.js";
import { Loader, ImgComplex } from "./loader.js";

export let canv:HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
let mainctx = canv.getContext('2d');
export let stepN:number = 0, deltaTime:{last:number, delta:number} = {last:0, delta:0};   //No. of iteration of main loop
let mainField : Field;
let player : Person;

//alert("SPACE DETECTIVE HELLOOOOO");    
initialisation();
//lets load all our images in PIXI
// PixiRenderer.addUrl("img/otus.json");
// PixiRenderer.addUrl("img/alph.json");
// PixiRenderer.addUrl("img/gawk.json");
// PixiRenderer.addUrl("img/ggawk.json");
// PixiRenderer.addUrl("img/tiles.jpg");
// let waiter = PixiRenderer.load();

//we need to wait for it to load now
// loadingWaiter(continueStart, waiter);     //  MAIN LOOP START

//this is what we call after all imgs are loaded
async function initialisation(){	
	// Loader.add({pixi:{urls:["img/otus.json","img/alph.json","img/gawk.json","img/ggawk.json"]}});
	// Loader.add({img:{url:"img/tiles.jpg",name:"tile",par:{x:0,y:0,w:70,h:40,col:3,row:3}}});
	// Loader.add({img:{url:"img/tiles.jpg",name:"rock",par:{x:300,y:0,w:70,h:40,col:3,row:3}}});
	initCanvas(canv);
	PixiRenderer.init();
	new ImgComplex({src:"img/otus2.png",name:'otus',param:{x:0,y:7*97,col:10,row:1, w:112, h:97}});
	new ImgComplex({src:"img/alphonse.png",name:'alph',param:{x:35,y:35+2*110,col:8,row:1, w:115, h:110}});
	// new ImgComplex({src:"img/gawk.json"});
	// new ImgComplex({src:"img/ggawk.json"});
	new ImgComplex({src:"img/tiles.jpg",name:"tile",param:{x:0,y:0,w:66,h:66,col:4,row:4}});
	new ImgComplex({src:"img/tiles.jpg",name:"rock",param:{x:66*4,y:0,w:66,h:66,col:4,row:4}});
	await Loader.load(initSecPart,{ctx:mainctx,x:100,y:100,r:40});
	initSecPart();
	function initSecPart(){
		initGame();
		console.log('gStart ending.. starting Main Loop.');
		mainLoop();	
	}
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




// //It waits and draws loading screen
// function loadingWaiter(callBack:Function, waiter:{complete:boolean, loaded:number, all:number}){
//     let ang=0, lx=canv.width/2, ly=canv.height/2;
//     mainctx.strokeStyle='#449933';
//     mainctx.lineWidth = 5;
//     loading();
    
//     function loading(){
//         // console.log('loading in progress... time '+(now()-begTime));
//         if(waiter.complete)
//         callBack();
//         else {
//             mainctx.beginPath();
//             mainctx.clearRect(lx-50,ly-50,100,100);
//             mainctx.arc(lx,ly,40,ang/2,ang, ang>12.56);
//             mainctx.stroke();
//             ang = (waiter.loaded/(waiter.all||1))*25.12*1%25.12;//(ang+.1)%25.12;
//             setTimeout(loading,5);
//         }
//     }
// }

export {mainField, player, initCanvas};
