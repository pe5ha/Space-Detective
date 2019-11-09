import { mainField, player } from "./main.js";
class DRAW {
    static init(w, h) {
        this.w = w;
        this.h = h;
        this.fvw = ~~(w / 2 / this.cellS);
        this.fvh = ~~(h / 2 / this.cellS);
        this.offx = w / 2 - this.cellS * (this.fvw + .5);
        this.offy = h / 2 - this.cellS * (this.fvh + .5);
        console.log(this.fvh);
        this.addTextBox(1, 1, "hasf hasf haaaasf");
        // this.cellS=Math.min(40,~~(this.w/mainField.w),~~(this.h/mainField.h));
        let all = " aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ1234567890";
        for (let i = 0; i < all.length; i++) {
            let le = all.charAt(i);
            this.lettcanv[le] = document.createElement("canvas");
            this.lettcanv[le].width = 15;
            this.lettcanv[le].height = 15;
            let ctx = this.lettcanv[le].getContext('2d');
            ctx.font = "15px Arial";
            ctx.fillText(le, 0, 15);
            // ctx.fillRect(0,0,10,10);
        }
    }
    static drawField(ctx) {
        let px = player.fx, py = player.fy;
        ctx.clearRect(0, 0, this.w, this.h);
        let fld = mainField, x, y;
        // ctx.translate(this.offx,this.offy);
        for (let i = px - this.fvw; i <= px + this.fvw; i++)
            for (let j = py - this.fvh; j <= py + this.fvh; j++) {
                let sq = fld.getField(j, i);
                if (!sq)
                    continue; //
                // console.log(i+' '+j);
                ctx.fillStyle = "#aaccbb";
                x = (i) * this.cellS;
                y = (j) * this.cellS;
                ctx.fillRect(x + 1, y + 1, this.cellS - 2, this.cellS - 2);
                for (let obj of sq.objList)
                    obj.face.drawMe(ctx, x + this.cellS / 2, y + this.cellS / 2, this.cellS - 2);
            }
        this.drawTextBoxes(ctx);
        // ctx.translate(-this.offx,-this.offy);
    }
    static drawTextBoxes(ctx) {
        for (let tb of this.textBoxes)
            tb.drawMe(ctx);
    }
    static addTextBox(fx, fy, text) {
        let bo = new TextBox(text, fx, fy);
        this.textBoxes.push(bo);
        return bo;
    }
    static remTextBox(tb) {
        let ind = this.textBoxes.indexOf(tb);
        this.textBoxes.splice(ind, 1);
    }
}
DRAW.cellS = 40;
DRAW.w = 10;
DRAW.h = 10;
DRAW.fvw = 10;
DRAW.fvh = 10;
DRAW.offx = 0;
DRAW.offy = 0;
DRAW.lettcanv = [];
DRAW.textBoxes = [];
class TextBox {
    constructor(txt, fx, fy, fw = 3, fh = 2) {
        this.txt = txt;
        this.fx = fx;
        this.fy = fy;
        this.fw = fw;
        this.fh = fh;
        this.progress = 0;
        this.tx = 10;
        this.ty = 10;
        this.lettS = 20;
        this.canv = document.createElement("canvas");
        this.ctx = this.canv.getContext('2d');
        this.timer = 0;
        this.canv.width = fw * DRAW.cellS;
        this.canv.height = fh * DRAW.cellS;
    }
    drawMe(ctx) {
        ctx.fillStyle = "#aa66bb";
        ctx.fillRect((this.fx) * DRAW.cellS, (this.fy) * DRAW.cellS, this.fw * DRAW.cellS, this.fh * DRAW.cellS);
        if (this.progress < this.txt.length && this.timer == 9)
            this.updCtx();
        this.timer = (this.timer + 1) % 10;
        ctx.drawImage(this.canv, (this.fx) * DRAW.cellS, (this.fy) * DRAW.cellS);
    }
    updCtx() {
        // console.log('upd');
        this.ctx.drawImage(DRAW.lettcanv[this.txt.charAt(this.progress)], this.tx, this.ty);
        this.tx += this.lettS;
        if (this.tx + this.lettS > this.canv.width) {
            this.tx = 10;
            this.ty += this.lettS;
        }
        this.progress++;
    }
}
class Face {
    constructor(obj) {
        this.obj = obj;
    }
    drawMe(ctx, x, y, s) {
        ctx.fillStyle = this.obj.color;
        ctx.beginPath();
        ctx.arc(x + 1, y, s * .45, 0, 6.29);
        ctx.fill();
    }
}
class WallFace extends Face {
    drawMe(ctx, x, y, s) {
        ctx.fillStyle = this.obj.color;
        ctx.beginPath();
        // ctx.moveTo(,);
        ctx.fill();
    }
}
export { DRAW, Face };
//# sourceMappingURL=draw.js.map