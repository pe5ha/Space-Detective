//an object, which represents how much is loaded in a parallel thread
type Waiter = {complete:boolean, loaded:number, all:number};
interface Loadee{len:number; load(wtr:Waiter, complCBack:Function);}
// class PixiLoadee implements Loadee{
//     len:number;
//     constructor(public urls:string[], public names:string[]=[]){this.len=urls.length;}
//     add(urls:string[],names:string[]=[]){
//         urls.forEach((v,i)=>{if(!names[i])names[i]=urls[i]});
//         this.urls=this.urls.concat(urls);
//         this.names=this.names.concat(names);
//         this.len+=urls.length;
//     }
//     load(wtr:Waiter, complCBack:Function) {
//         console.log('loading pixi stuff');
//         loadNext.apply(this);
//         function loadNext(){
//                 if(this.urls.length){
//                     wtr.loaded++;
//                     pixiLoader.add(this.names.pop(),this.urls.pop()).load(()=>{setTimeout(loadNext.bind(this), 0)});
//                 }else complCBack();
//             }//
//     }
// }
// class ImgLoadee implements Loadee{
//     len:number;

//     constructor(public urls:string[]=[], public names:string[]=[], public params:ImgParam[]=[]){this.len=urls.length;}
//     add(url:string,name:string=url,pr:ImgParam=null){
//         this.len+=(pr)?pr.col*pr.row : 1;
//         this.urls.push(url);
//         this.names.push(name);
//         this.params.push(pr);
//     }
//     load(wtr:Waiter, complCBack:Function) {
//         console.log('loading img stuff');
//         loadNextImg.apply(this);
//         function loadNextImg(){
//             let imgSrc:string, img:HTMLImageElement, pr:ImgParam,fr, name;
//             if(this.urls.length){
//                 name=this.names.pop();
//                 imgSrc=this.urls.pop();
//                 img = ImgCache[imgSrc] = new Image();
//                 pr = this.params.pop();
//                 fr=0;
//                 img.onload=(()=>{
//                     if(!pr)pr={x:0,y:0,col:1,row:1,w:img.width,h:img.height};
//                     setTimeout(loadNextCan.bind(this, pr), 0);
//                 });
//                 img.src=imgSrc; //At this point async downloading starts automatically
//             }else complCBack();
//             function loadNextCan(pr:ImgParam){
//                     if(fr<pr.col*pr.row){
//                         let can = document.createElement('canvas');
//                         can.width=pr.w;
//                         can.height=pr.h;
//                         // console.log(pr.x+pr.w*(fr%pr.col));
//                         console.log(pr.y+pr.h*~~(fr/pr.row));
                        
//                         can.getContext('2d').drawImage(img,pr.x+pr.w*(fr%pr.col),pr.y+pr.h*~~(fr/pr.col),pr.w,pr.h,0,0,pr.w,pr.h);
//                         ImgCanCache[name+'_'+((fr<10)?'0':'')+fr]=can;
//                         wtr.loaded++;
//                         fr++;
//                         setTimeout(loadNextCan.bind(this,pr), 0);
//                     }else loadNextImg.apply(this);
//                 }
//             }
//     }
// }

const IMAGES:ImgComplex[]=[];

type ImgParam={x:number,y:number,w:number, h:number, col:number, row:number};
type ImgEffects={scx:number, scy:number};

class ImgComplex implements Loadee{
    src:string;
    name:string;
    img:HTMLImageElement;
    canvs:HTMLCanvasElement[]=[];
    pixitexs:[]=[];//PIXI.Texture
    param:ImgParam;
    eff;
    len:number;
    constructor({ src, name = src, param, eff={scx:1,scy:1}}: { src: string; name?: string; param?:ImgParam; eff?:ImgEffects }){
        IMAGES[name]=this;
        Loader.list.push(this);
        this.src=src;
        this.name=name;
        this.param=param;
        this.eff=eff;
        this.len=(param)?param.col*param.row:1;
    }
    load(wtr:Waiter, complCBack:Function) {
        let fr=0;
        this.img = new Image();
        fr=0;
        this.img.onload=(()=>{
            if(!this.param)this.param={x:0,y:0,col:1,row:1,w:this.img.width,h:this.img.height};
            setTimeout(loadNextCan.bind(this), 0);
        });
        this.img.src=this.src; //At this point async downloading starts automatically
        
        function loadNextCan(pr:ImgParam=this.param){
                if(fr<pr.col*pr.row){
                    let can = document.createElement('canvas'),ctx=can.getContext('2d'), scx=this.eff.scx, scy=this.eff.scy;
                    can.width=pr.w*scx;
                    can.height=pr.h*scy;
                    ctx.scale(scx,scy);              
                    ctx.drawImage(this.img,pr.x+pr.w*(fr%pr.col),pr.y+pr.h*~~(fr/pr.col),pr.w,pr.h,0,0,pr.w,pr.h);
                    this.canvs.push(can);
                    this.pixitexs.push(new PIXI.Texture.from(can));
                    wtr.loaded++;
                    fr++;
                    setTimeout(loadNextCan.bind(this), 0);
                }else complCBack();;
            }
    }
}

//Aliases
let PIXI = window["PIXI"];  //perfect solution. thx ts
let TextureCache = PIXI.utils.TextureCache,
    pixiLoader = PIXI.Loader.shared;


//it can load images, convert to Bitmaps, load Pixi Textures, produce canvases.
//first add evrth you want to load/produce. the call Loader.load()
//loaded pixi Textures accessed through TextureCache[url]
class Loader{
    static list:Loadee[]=[];

    static load(callback:Function,draw:{ctx:CanvasRenderingContext2D,x:number,y:number,r:number}=null){
        let wt = {complete:false, loaded:0, all:0};
        let n=-1;
        for(let ld of this.list)
            wt.all+=ld.len;
        loadNext();
        return new Promise(loadingWaiter);

        function loadNext(){
            if(++n<Loader.list.length)Loader.list[n].load(wt,loadNext);
            else wt.complete=true;
        }
        //It waits and draws loading screen
        function loadingWaiter(resolve){
            let ang=0;
            if(draw){
                draw.ctx.strokeStyle='#449933';
                draw.ctx.lineWidth = 5;
            }
            loading();
            
            function loading(){
                // console.log('loading in progress... time '+(now()-begTime));
                if(wt.complete)
                    resolve();
                else {
                    setTimeout(loading,17);
                    if(draw){
                        ang = (wt.loaded/(wt.all||1))*25.12*1%25.12;//(ang+.1)%25.12;
                        draw.ctx.beginPath();
                        draw.ctx.clearRect(draw.x-50,draw.y-50,100,100);
                        draw.ctx.arc(draw.x,draw.y,draw.r,ang/2,ang, ang>12.56);
                        draw.ctx.stroke();
                    }
                }
            }
        }
    }
}

export {Loadee, Loader, TextureCache, ImgComplex, IMAGES}