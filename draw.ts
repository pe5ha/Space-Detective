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

        this.addTextBox(1,1,"hasf hasf haaaasf");
        
        // this.cellS=Math.min(40,~~(this.w/mainField.w),~~(this.h/mainField.h));
        let all=" aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ1234567890";
        for(let i=0;i<all.length;i++){
            let le = all.charAt(i);
            this.lettcanv[le]=document.createElement("canvas");
            this.lettcanv[le].width=15;
            this.lettcanv[le].height=15;
            let ctx = this.lettcanv[le].getContext('2d');
            ctx.font="15px Arial";
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

    static addTextBox(fx,fy,text):TextBox{
        let bo = new TextBox(text,fx,fy);
        this.textBoxes.push(bo);
        return bo;
    }
    static remTextBox(tb:TextBox){
        let ind=this.textBoxes.indexOf(tb);
        this.textBoxes.splice(ind,1);
    }
}
class TextBox{
    progress:number=0;
    tx:number=10; ty:number=10; lettS:number=20;  
    canv:HTMLCanvasElement = document.createElement("canvas");
    ctx:CanvasRenderingContext2D = this.canv.getContext('2d');
    timer:number=0;
    constructor(public txt:string, public fx:number, public fy:number, public fw=3, public fh = 2){
        this.canv.width=fw*DRAW.cellS;
        this.canv.height=fh*DRAW.cellS;
    }
    drawMe(ctx){
        ctx.fillStyle="#aa66bb";
        ctx.fillRect((this.fx)*DRAW.cellS,(this.fy)*DRAW.cellS, this.fw*DRAW.cellS, this.fh*DRAW.cellS);
        if(this.progress<this.txt.length&&this.timer==9)
            this.updCtx();
        this.timer=(this.timer+1)%10;
        ctx.drawImage(this.canv,(this.fx)*DRAW.cellS,(this.fy)*DRAW.cellS);
    }
    updCtx(){
        // console.log('upd');
        
        this.ctx.drawImage(DRAW.lettcanv[this.txt.charAt(this.progress)],this.tx,this.ty);
        this.tx+=this.lettS;
        if(this.tx+this.lettS>this.canv.width) {this. tx = 10; this.ty+=this.lettS}
        this.progress++;
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
