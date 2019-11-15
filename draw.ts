import { Field, FieldObj, Cell } from "./field.js";
import { mainField, player } from "./main.js";

class DRAW{
    static cellS:number=40;
    static w:number=10;
    static h:number=10;
    static fvw:number=10;
    static fvh:number=10;
    static offx:number=0;
    static offy:number=0;
    static lettS:number=20; 
    static lettcanv:HTMLCanvasElement[]=[];
    static textBoxes:TextBox[]=[];
    
    static init(w:number,h:number){
        this.w=w;
        this.h=h;
        this.fvw = ~~(w/2/this.cellS);
        this.fvh = ~~(h/2/this.cellS);
        this.offx = w/2-this.cellS*(this.fvw+.5);
        this.offy = h/2-this.cellS*(this.fvh+.5);
        console.log(this.fvh);

        
        
        // this.cellS=Math.min(40,~~(this.w/mainField.w),~~(this.h/mainField.h));
        let all=" aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ1234567890";
        for(let i=0;i<all.length;i++){
            let le = all.charAt(i);
            this.lettcanv[le]=document.createElement("canvas");
            this.lettcanv[le].width=15;
            this.lettcanv[le].height=15;
            let ctx = this.lettcanv[le].getContext('2d');
            ctx.font=this.lettS+"px Arial";
            ctx.fillText(le,0,15);
            // ctx.fillRect(0,0,10,10);
        }
    }

    static drawField(ctx:CanvasRenderingContext2D){
        let px=player.fx, py=player.fy;
        ctx.clearRect(0,0,this.w,this.h);
        let fld = mainField,x,y;
        // ctx.translate(this.offx,this.offy);
        for(let i = px-this.fvw; i<=px+this.fvw;i++)
            for(let j = py-this.fvh; j<=py+this.fvh;j++){
                let sq:Cell = fld.getField(j,i);
                if(!sq)continue;//
                // console.log(i+' '+j);
                
                ctx.fillStyle="#aaccbb";
                x=(i)*this.cellS; y=(j)*this.cellS;
                ctx.fillRect(x+1,y+1,this.cellS-2,this.cellS-2);
                for(let obj of sq.objList)
                    obj.face.drawMe(ctx,x+this.cellS/2,y+this.cellS/2,this.cellS-2);
            }
        this.drawTextBoxes(ctx);
        // ctx.translate(-this.offx,-this.offy);
    }

    static drawTextBoxes(ctx){
        for(let tb of this.textBoxes)
            tb.drawMe(ctx);
    }

    static addTextBox(text,fx,fy,fw,fh):TextBox{
        let bo = new TextBox(text,fx,fy,fw,fh);
        this.textBoxes.push(bo);
        return bo;
    }
    static remTextBox(tb:TextBox){
        let ind=this.textBoxes.indexOf(tb);
        this.textBoxes.splice(ind,1);
    }
    static createDialogWin(text:string,sx:number,sy:number):TextBox{
        let dens=Math.pow((this.cellS/this.lettS),2), cellN=Math.ceil(text.length/dens);
        console.log(dens+' '+cellN);
        
        let bw=1, bh=1, x1=sx,x2=sx,y1=sy,y2=sy, fl=false;
        while(bw*bh<cellN){
            fl=true;
            for(let i=0;i<bh;i++)
                fl=fl&&free(x1-1,y1+i);
            if(fl){x1-=1;bw++;}
            fl=true;
            for(let i=0;i<bh;i++)
                fl=fl&&free(x2+1,y1+i);
            if(fl){x2+=1;bw++;}
            if(bw*bh>=cellN)break;
            fl=true;
            for(let i=0;i<bw;i++)
                fl=fl&&free(x1+i,y1-1);
            if(fl){y1-=1;bh++;}
        }
        return this.addTextBox(text,x1,y1,bw,bh);
        function free(x,y){
            if(x==player.fx&&y==player.fy)return false;
            for(let tb of DRAW.textBoxes)if((tb.fx<=x&&(tb.fx+tb.fw-1)>=x)&&(tb.fy<=y&&(tb.fy+tb.fh-1)>=y))return false;
            return true;
        }
    }
    
}
class TextBox{
    progress:number=0;//num of letters drawn
    tx:number=0; ty:number=0; 
    canv:HTMLCanvasElement = document.createElement("canvas");
    ctx:CanvasRenderingContext2D = this.canv.getContext('2d');
    timer:number=0;
    constructor(public txt:string, public fx:number, public fy:number, public fw=3, public fh = 2){
        this.canv.width=fw*DRAW.cellS;
        this.canv.height=fh*DRAW.cellS;
    }
    init(){
        this.progress=0;
        this.tx=0;this.ty=0;
    }
    drawMe(ctx){
        ctx.fillStyle="#aa66bb";
        ctx.fillRect((this.fx)*DRAW.cellS,(this.fy)*DRAW.cellS, this.fw*DRAW.cellS, this.fh*DRAW.cellS);
        if(this.progress<this.txt.length&&this.timer==0)
            this.drawLett();
        this.timer=(this.timer-1);
        ctx.drawImage(this.canv,(this.fx)*DRAW.cellS,(this.fy)*DRAW.cellS);
    }
    drawLett(){
        // console.log('upd');
        
        this.ctx.drawImage(DRAW.lettcanv[this.txt.charAt(this.progress)],this.tx,this.ty);
        this.tx+=DRAW.lettS;
        if(this.tx+DRAW.lettS>this.canv.width) {this. tx = 0; this.ty+=DRAW.lettS}
        this.progress++;
        this.timer=3;
    }
    fillLett(n:number){
        this.init();
        for(let i=0;i<n;i++)
            this.drawLett();
    }
}

class Face{
    constructor(public obj:FieldObj){}
    drawMe(ctx:CanvasRenderingContext2D,x:number,y:number,s:number){
        ctx.fillStyle = this.obj.color;
        ctx.beginPath();
        ctx.arc(x+1,y,s*.45,0,6.29);
        ctx.fill();
    }
}
class WallFace extends Face{
    drawMe(ctx:CanvasRenderingContext2D,x:number,y:number,s:number){
        ctx.fillStyle = this.obj.color;
        ctx.beginPath();
        // ctx.moveTo(,);
        ctx.fill();
    }
}

export{DRAW, Face}
