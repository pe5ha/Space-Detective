import { Field, FieldObj, Square } from "./field.js";
import { mainField } from "./main.js";

class DRAW{

    static drawField(ctx:CanvasRenderingContext2D){
        let fld = mainField;
        for(let i = 0; i<fld.w;i++)
            for(let j = 0; j<fld.w;j++){
                ctx.fillStyle="#aaccbb";
                ctx.fillRect(i*20,j*20,18,18);
                let sq:Square = fld.getField(i,j);
                for(let obj of sq.objList)
                    obj.face.drawMe(ctx,i*20+10,j*20+10,18);
            }
    }

}

class Face{
    constructor(public obj:FieldObj){}
    drawMe(ctx:CanvasRenderingContext2D,x:number,y:number,s:number){
        ctx.fillStyle = this.obj.color;
        ctx.arc(x,y,s*.45,0,6.29);
        ctx.fill();
    }
}

export{DRAW, Face}
