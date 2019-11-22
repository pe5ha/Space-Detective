import { mainctx, drawCircle, bgclr, canv, getRndClr } from "./main.js";

window.addEventListener("mousedown",(e:MouseEvent)=>{balls.push(newBall({x:e.clientX,y:e.clientY,r:5}))})

type Ball={x:number, y:number,vx:number, vy:number,r:number, clr:string, par:Ball};
function newBall({ x, y, vx = 0, vy = 0, r, clr=getRndClr() , par=parball}: 
        { x: number; y: number; vx?: number; vy?: number; r: number; clr?: string; par?:Ball}):Ball{
    return { x, y, vx, vy, r, clr, par }
}
let parball;
let balls:Ball[]=[], deadBalls:Ball[]=[];





export function initApolloBalls(){
    parball={x:canv.width/2, y:canv.height/2,vx:0, vy:0,r:Math.min(canv.width,canv.height)/2, clr:"#333333", par:null};
}

export function drawApolloBalls(){
    
    mainctx.fillStyle=bgclr;
    mainctx.fillRect(0,0,canv.width,canv.height);
    drawCircle( mainctx, parball.x,parball.y,parball.r,parball.clr);
    for(let ba of balls){
        moveB(ba);
    }
    arrRemAll(balls,(b)=>(deadBalls.indexOf(b)>=0));
    deadBalls=[];
    for(let ba of balls){
        drawCircle( mainctx, ba.x,ba.y,ba.r,ba.clr,3);
    }


    function moveB(b:Ball){
        b.x+=b.vx;
        b.y+=b.vy;
        b.vx*=.95;
        b.vy*=.95;
        let pd=dist(b.par.x-b.x,b.par.y-b.y),psin=(b.par.y-b.y)/pd,pcos=(b.par.x-b.x)/pd,pover=pd-b.par.r+b.r;
        if(pover>0)repel(b,b.par,pcos,psin,pover*b.par.r*b.r*.01);
        let overs=0;
        for(let ob of balls){
            if(ob.r<=b.r)continue;
            let d=dist(ob.x-b.x,ob.y-b.y),sin=(ob.y-b.y)/d,cos=(ob.x-b.x)/d,over=-d+ob.r+b.r;
            if(over>0){
                repel(b,ob,cos,sin,-over*b.par.r*b.r*.01);
                overs++;
            }
        }
        if(overs==0 && pover<0)b.r=Math.min(b.par.r*.7,b.r+1);
        if(overs>=3 || pover>0 && overs>=2){b.r--;if(b.r<1)deadBalls.push(b);}

        function repel(b1:Ball,b2:Ball,cos,sin,p){
            let coe=p/b1.r/b1.r;
            b1.vx+=cos*coe;b1.vy+=sin*coe;
            coe=p/b2.r/b2.r;
            b2.vx-=cos*coe;b2.vy-=sin*coe;
            // b.vx+=cos*p*.01;b.vy+=sin*p*.01;
            // b.vx=Math.abs(cos)*p*.1;b.vy=Math.abs(sin)*p*.1;
            // b.vx+=Math.abs(cos)*p*.1;b.vy+=Math.abs(sin)*p*.1;
        }
    }
}

//removes all elements, which satisfy condition
export function arrRemAll<T>(arr:T[], fun:(a:T)=>boolean, remFun:(a:T[],i:number)=>void = null):void{
	let i=0;
	while(i<arr.length)
		if(fun(arr[i]))
			if(remFun)remFun(arr,i);
			else arr.splice(i,1);
		else i++;
}
export function dist(dx,dy){return  Math.sqrt(dx*dx+dy*dy) ;}
