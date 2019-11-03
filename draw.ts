import { Field } from "./field.js";

class DRAW{

    static drawField(ctx:CanvasRenderingContext2D){
        ctx.fillStyle="#aaadd";
        ctx.fillRect(10,10,20,20);
    }

}

class Face{
    drawMe(ctx:CanvasRenderingContext2D){
        console.log('fasdf');
        
    }
}

export{DRAW}
