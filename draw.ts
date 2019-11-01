

class DRAW{

    static drawField(ctx:CanvasRenderingContext2D){
        ctx.fillStyle="#aaadd";
        // ctx.fillRect(10,10,20,20);
        // ctx.fillRect(40,10,20,20);
        // ctx.fillRect(10,40,20,20);
        // ctx.fillRect(40,40,20,20);
        let f = Field.getField();
    }

}

export{DRAW}
