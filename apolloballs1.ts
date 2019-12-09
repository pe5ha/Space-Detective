import { mainctx, drawCircle, bgclr, canv, getRndClr } from "./main.js";

let autoclick=true,ang=0;
let msdown=false,crtTimer=0,ee:{x:number,y:number};
window.addEventListener("mousedown",(e:MouseEvent)=>{
    msdown=true;
})
window.addEventListener("mousemove",(e:MouseEvent)=>{
    ee={x:e.clientX,y:e.clientY};
})
window.addEventListener("mouseup",(e:MouseEvent)=>{
    msdown=false;
})
window.addEventListener("keypress",(e:KeyboardEvent)=>{
    if(e.key==' ')autoclick=!autoclick;console.log(parball.maxs);
    
})

class Ball{
    clr1:number=Math.random();
    clr2:number=-.05;
    repel=Math.random()*.2-.05;
    maxs=mmin(.1+~~(Math.random()*100)*.3,1);
    constructor(public x:number, public y:number,public vx:number, public vy:number,private r:number,
         public clr:string, public par:Ball, public bigbros:{bb:Ball,d:number,sin:number,cos:number}[],
         public balls:Ball[]){
            if(par)this.clr1=(par.clr1+par.clr2*Math.random()+1)%1;
            this.clr2=(Math.random()-.5)*.5;
            this.clr=toClr(new HSV(this.clr1,1,1));
         }
    set rad(val:number){
        // this.clr=toClr(new HSV(this.clr1+this.clr2*(this.rad/this.par.rad),1,1)); 
        this.r=val;
    }
    get rad(){return this.r}
    turnInto(b:Ball){
        if(b.par!=this)
        console.log('aggasga');
        
        for(let cb of this.balls)
            deadBalls.push(cb);
        if(this==parball)backclr=toClr(new HSV(b.clr1,.1,.2));
        this.balls = b.balls;
        this.clr=b.clr;
        this.clr1=b.clr1;
        this.clr2=b.clr2;
        this.repel=b.repel;
        this.maxs=b.maxs;
        for(let cb of b.balls)
            cb.par=this;
    }
}
function newBall({ x, y, vx = 0, vy = 0, r, clr=getRndClr() , par=parball}: 
        { x: number; y: number; vx?: number; vy?: number; r: number; clr?: string; par?:Ball}):Ball{
    return new Ball(x, y, vx, vy, r, clr, par , [], []);
}
let parball:Ball, allballs:Ball[]=[], backclr;
let deadBalls:Ball[]=[];




export function initApolloBalls(){
    parball=newBall({x:canv.width/2, y:canv.height/2,vx:0, vy:0,r:Math.min(canv.width,canv.height)/2, clr:"#333333", par:null});
    parball.repel=.05;
    parball.maxs=1;
    parball.clr2=.05;
    backclr=toClr(new HSV(parball.clr1,.1,.1));
    ee={x:parball.x+parball.rad/2,y:parball.y};
}

let newR=5;
export function drawApolloBalls(){
    if(autoclick){
        // ee.x=(Math.cos((++ang)*.1)*.5)*parball.rad+parball.x;
        // ee.y=(Math.sin(ang*.1)*.5)*parball.rad+parball.y;
        ee.x=(Math.random()-.5)*parball.rad*2+parball.x;
        ee.y=(Math.random()-.5)*parball.rad*2+parball.y;
        // parball.clr1+=.01;
    }
    if(msdown || autoclick)if(++crtTimer>3){
        crtTimer=0;
        let pb = allballs.reduce((b:Ball,nb:Ball)=>{
            if(nb.rad>5 && dist(ee.x-nb.x,ee.y-nb.y)<nb.rad-newR && nb.rad<b.rad)
                return nb;
            else return b;
        }, parball);
        let newb = newBall({x:ee.x,y:ee.y,r:newR,par:pb});
        pb.balls.push(newb);
        allballs.push(newb);
    }
    // mainctx.fillStyle=bgclr;
    // mainctx.fillRect(0,0,canv.width,canv.height);
    drawCircle( mainctx, parball.x,parball.y,parball.rad+1,backclr+'66');
    for(let ba of allballs){
        moveB(ba);
    }
    arrRemAll(allballs,(b)=>(deadBalls.indexOf(b)>=0));
    deadBalls.forEach((b)=>{arrDel(b.par.balls,b)});
    deadBalls=[];
    
    for(let ba of allballs){
        drawCircle( mainctx, ba.x,ba.y,ba.rad-1,ba.clr,mmin(ba.rad/10,3));
    }
    function moveB(b:Ball){
        if(b.par!=parball && allballs.indexOf(b.par)<0){
            deadBalls.push(b);
            return;
        }
        if(b.par.balls.indexOf(b)<0)console.log('shit');
        
        b.x+=b.vx;
        b.y+=b.vy;
        b.vx*=.9;
        b.vy*=.9;
        b.bigbros=[];
        b.rad+=.1;
        let pd=dist(b.par.x-b.x,b.par.y-b.y),psin=(b.par.y-b.y)/pd,pcos=(b.par.x-b.x)/pd,pover=pd-b.par.rad+b.rad;
        if(pover>0){
            b.x+=pover*pcos;
            b.y+=pover*psin;
        }//repel(b,b.par,pcos,psin,pover*b.par.r*b.r*.01);
        let maxover=-Infinity;
        for(let ob of b.par.balls){
            if(ob.rad-b.rad<-.5 || ob==b)continue;
            let d=dist(ob.x-b.x,ob.y-b.y),sin=(ob.y-b.y)/d,cos=(ob.x-b.x)/d,over=-d+ob.rad+b.rad;
            if(over>maxover)maxover=over;
            if(over>-0.1){
                b.bigbros.push({bb:ob,sin:sin,cos:cos,d:over});
                let bb=b.bigbros.pop();
                repel(b,bb.bb,bb.cos,bb.sin,-(bb.d+1)*b.par.rad*b.rad*.01);
                b.bigbros.push({bb:ob,sin:sin,cos:cos,d:over});
            }
        }
        // if(b.bigbros.length<2+((pover>0)?1:0))
        //     for(let bb of b.bigbros)
        // b.r+=0.005*Math.abs(b.par.x-b.x);
        if(b.bigbros.length==0){
            b.rad=Math.min(b.par.rad*b.par.maxs,b.rad+Math.min(1,-pover,-maxover));
            if(b.rad/b.par.rad>.99){
                b.par.turnInto(b);
                deadBalls.push(b);
            }
            // console.log('GDSSDSGDSDGGDSDSG');
            
        } else {
            b.rad-=maxover;//if(maxover<b.r)
            for(let bb of b.bigbros){
                
            }
        }
        // if(overs>=2 || pover>0 && overs>=1){b.r--;}
        if(b.rad<=3)deadBalls.push(b);
        function repel(b1:Ball,b2:Ball,cos,sin,p){
            let coe=p/b1.rad*b.par.repel;
            b1.vx+=cos*coe;b1.vy+=sin*coe;
            coe=p/b2.rad*b.par.repel;
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
//removes element from array
export function arrDel(arr:Array<any>, o:any):boolean{
	for( var i = 0; i < arr.length; i++){ 
		if ( arr[i] === o) {
		  arr.splice(i, 1); 
		  return true;
		}
	}
	return false;
}
export function dist(dx,dy){return  Math.sqrt(dx*dx+dy*dy) ;}

export function toClr(n:number|RGB|HSV):string{	// Number or {rgb} -> strColor
    if(n instanceof HSV)n=HSVtoRGB(n);
	if(n instanceof RGB)n= n.r*0x10000+n.g*0x100+n.b;
    var res=(~~n).toString(16);
    while(res.length<6)res="0"+res;
	return "#"+res;
}

//returns arctg(dy/dx)
export function getAng(dx,dy):number{return (Math.atan(dy/(dx||.01))+(dx<0?3.14:0) +6.28)%6.28}
// export function getRad(dx,dy,rad){return Math.min(rad,dist(dx,dy))}
export function rgbAdd(c1:RGB,c2:RGB,a:number=.5,b:number=1-a):RGB{	return new RGB(~~(c1.r*a+c2.r*b),~~(c1.g*a+c2.g*b),~~(c1.b*a+c2.b*b));}
export function hsvAdd(c1:HSV,c2:HSV,a:number=.5,b:number=1-a):HSV{	return new HSV((c1.h*a+c2.h*b)%1,(c1.s*a+c2.s*b),(c1.v*a+c2.v*b));}
export function rgbLim(n:RGB):RGB{n.r=mmax(0,mmin(0xff,n.r));n.g=mmax(0,mmin(0xff,n.g));n.b=mmax(0,mmin(0xff,n.b));return n;}
export function hsvLim(n:HSV):HSV{n.h=(n.h+10)%1;n.s=mmax(0,mmin(1,n.s));n.v=mmax(0,mmin(1,n.v));return n;}

export function rgbMult(clr:RGB,a:number,b:number=a,c:number=a):RGB{return new RGB(Math.min(255,~~(clr.r*a)),Math.min(255,~~(clr.g*b)),Math.min(255,~~(clr.b*c)));}
export function getRndClrN():number{	//rand Number
	var n=~~(Math.random()*0xffffff);
	return n;
}
export class RGB {constructor(public r:number,public g:number,public b:number){}
static white=new RGB(255,255,255);
static grey=new RGB(127,127,127);};
export class HSV {constructor(public h:number,public s:number,public v:number){}};
export function HSVtoRGB(hsv:HSV):RGB{
    let vmin=~~((1-hsv.s)*hsv.v*255), vmax=~~(hsv.v*255), a=~~((vmax-vmin)*(hsv.h % .1666)*6);
    switch (~~(hsv.h/.1666)){
        case 1: return new RGB(vmax-a, vmax, vmin);
        case 2: return new RGB(vmin,  vmax,  vmin+a);
        case 3: return new RGB(vmin,  vmax-a,vmax);
        case 4: return new RGB(vmin+a,vmin,  vmax);
        case 5: return new RGB(vmax,  vmin,  vmax-a);
        default:return new RGB(vmax,  vmin+a,vmin);
    }
}
export function mmax(x,y){return Math.max(x,y);}
export function mmin(x,y){return Math.min(x,y);}