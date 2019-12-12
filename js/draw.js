import { mainField, player, deltaTime, canv } from "./main.js";
import { IMAGES } from "./loader.js";
class DRAW {
    static init(w, h) {
        this.w = w;
        this.h = h;
        this.fvw = ~~(w / 2 / this.cellS);
        this.fvh = ~~(h / 2 / this.cellS);
        this.offx = w / 2 - this.cellS * (this.fvw + .5);
        this.offy = h / 2 - this.cellS * (this.fvh + .5);
        console.log(this.fvh);
        this.FillFloor();
        // PixiRenderer.addUrl("img/otus.json");
        // PixiRenderer.addUrl("img/alph.json");
        // PixiRenderer.addUrl("img/gawk.json");
        // PixiRenderer.addUrl("img/ggawk.json");
        // this.cellS=Math.min(40,~~(this.w/mainField.w),~~(this.h/mainField.h));
        let all = " aAbBcCdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ1234567890,.!?йцукенгшщзхъфывапролджэячсмитьбюЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ";
        for (let i = 0; i < all.length; i++) {
            let le = all.charAt(i);
            this.lettcanv[le] = document.createElement("canvas");
            this.lettcanv[le].width = 15;
            this.lettcanv[le].height = 15;
            let ctx = this.lettcanv[le].getContext('2d');
            ctx.font = this.lettS + "px Arial";
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
        PixiRenderer.render();
        this.drawTextBoxes(ctx);
        // ctx.translate(-this.offx,-this.offy);
    }
    static FillFloor() {
        let map = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 1, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
        let can = document.createElement('canvas'), ctx = can.getContext('2d'), rnd, mapnames = ['tile', 'rock'];
        can.width = mainField.w * DRAW.cellS;
        can.height = mainField.h * DRAW.cellS;
        for (let i = 0; i < Math.min(map[0].length, mainField.w); i++)
            for (let j = 0; j < Math.min(map.length, mainField.h); j++) {
                let imgc = IMAGES[mapnames[map[j][i]]];
                rnd = ~~(Math.random() * imgc.canvs.length);
                ctx.drawImage(imgc.canvs[rnd], i * DRAW.cellS, j * DRAW.cellS, DRAW.cellS, DRAW.cellS);
            }
        let spr = new PIXI.Sprite(PIXI.Texture.from(can));
        PixiRenderer.backCont.addChild(spr);
    }
    static drawTextBoxes(ctx) {
        for (let tb of this.textBoxes)
            tb.drawMe(ctx);
    }
    static addTextBox(text, fx, fy, fw, fh) {
        let bo = new TextBox(text, fx, fy, fw, fh);
        this.textBoxes.push(bo);
        return bo;
    }
    static remTextBox(tb) {
        let ind = this.textBoxes.indexOf(tb);
        this.textBoxes.splice(ind, 1);
    }
    static remAllTextBoxes() {
        this.textBoxes = [];
    }
    static createDialogWin(text, sx, sy) {
        let dens = Math.pow((this.cellS / this.lettS), 2), cellN = Math.ceil(text.length / dens);
        console.log(dens + ' ' + cellN);
        let bw = 1, bh = 1, x1 = sx, x2 = sx, y1 = sy, y2 = sy, fl = false;
        while (bw * bh < cellN) {
            fl = true;
            for (let i = 0; i < bh; i++)
                fl = fl && free(x1 - 1, y1 + i);
            if (fl) {
                x1 -= 1;
                bw++;
            }
            fl = true;
            for (let i = 0; i < bh; i++)
                fl = fl && free(x2 + 1, y1 + i);
            if (fl) {
                x2 += 1;
                bw++;
            }
            if (bw * bh >= cellN)
                break;
            fl = true;
            for (let i = 0; i < bw; i++)
                fl = fl && free(x1 + i, y1 - 1);
            if (fl) {
                y1 -= 1;
                bh++;
            }
        }
        return this.addTextBox(text, x1, y1, bw, bh);
        function free(x, y) {
            if (x == player.fx && y == player.fy)
                return false;
            for (let tb of DRAW.textBoxes)
                if ((tb.fx <= x && (tb.fx + tb.fw - 1) >= x) && (tb.fy <= y && (tb.fy + tb.fh - 1) >= y))
                    return false;
            return true;
        }
    }
}
DRAW.cellS = 40;
DRAW.w = 10;
DRAW.h = 10;
DRAW.fvw = 10;
DRAW.fvh = 10;
DRAW.offx = 0;
DRAW.offy = 0;
DRAW.lettS = 20;
DRAW.lettcanv = [];
DRAW.textBoxes = [];
class TextBox {
    constructor(txt, fx, fy, fw = 3, fh = 2) {
        this.txt = txt;
        this.fx = fx;
        this.fy = fy;
        this.fw = fw;
        this.fh = fh;
        this.progress = 0; //num of letters drawn
        this.tx = 0;
        this.ty = 0;
        this.canv = document.createElement("canvas");
        this.ctx = this.canv.getContext('2d');
        this.timer = 0;
        this.canv.width = fw * DRAW.cellS;
        this.canv.height = fh * DRAW.cellS;
    }
    init() {
        this.progress = 0;
        this.tx = 0;
        this.ty = 0;
    }
    drawMe(ctx) {
        ctx.fillStyle = "#aa66bb";
        ctx.fillRect((this.fx) * DRAW.cellS, (this.fy) * DRAW.cellS, this.fw * DRAW.cellS, this.fh * DRAW.cellS);
        if (this.progress < this.txt.length && this.timer == 0)
            this.drawLett();
        this.timer = (this.timer - 1);
        ctx.drawImage(this.canv, (this.fx) * DRAW.cellS, (this.fy) * DRAW.cellS);
    }
    drawLett() {
        // console.log('upd');
        this.ctx.drawImage(DRAW.lettcanv[this.txt.charAt(this.progress)], this.tx, this.ty);
        this.tx += DRAW.lettS;
        if (this.tx + DRAW.lettS > this.canv.width) {
            this.tx = 0;
            this.ty += DRAW.lettS;
        }
        this.progress++;
        this.timer = 3;
    }
    fillLett(n) {
        this.init();
        for (let i = 0; i < n; i++)
            this.drawLett();
    }
}
class Face {
    constructor(obj) {
        this.obj = obj;
        this.objY = -Infinity;
        console.log('a'); //
        this.pixAni = new PixiAniSprite((Math.random() > .3) ? "otus" : "alph", obj);
        // addSprite(this, ~~(Math.random()*4));
        PixiRenderer.moveObj(this.pixAni, obj.fy);
    }
    drawMe(ctx, x, y, s) {
        ctx.fillStyle = this.obj.color;
        ctx.beginPath();
        ctx.arc(x + 1, y, s * .45, 0, 6.29);
        ctx.fill();
        this.pixAni.step(x, y, 1);
    }
    objMovedTo(newX, newY) {
        if (this.objY != newY) {
            this.objY = newY;
            PixiRenderer.moveObj(this.pixAni, newY);
        }
    }
}
//adds sprite to object
// function addSprite(face:Face, type:number){
//     switch(type){
//         case 0: 
//             face.pixAni=new PixiAniSprite([texNameHelper('otus_','.png',42,51),texNameHelper('otus_','.png',4,15)],face.obj);
//         break;
//         case 1: 
//             face.pixAni=new PixiAniSprite([texNameHelper('alphonse_','.png',30,37),texNameHelper('alphonserun_','.png',41,46)],face.obj);
//         break;
//         case 2: 
//             face.pixAni=new PixiAniSprite([texNameHelper('gawk_','.png',1,6),texNameHelper('gawk_','.png',1,6)],face.obj);
//         break;
//         case 3: 
//             face.pixAni=new PixiAniSprite([texNameHelper('ggawk_','.png',1,6),texNameHelper('ggawk_','.png',1,6)],face.obj);
//         break;
//     }
// }
// function texNameHelper(beg:string, end:string, i1:number, i2:number){
//     let res:string[]=[];
//     for(let i=i1; i<=i2; i++)
//         res.push(beg+((i<10)?'0':'')+i+end);
//     return res;
// }
//Aliases
let PIXI = window["PIXI"]; //perfect solution. thx ts
let TextureCache = PIXI.utils.TextureCache, pixiLoader = PIXI.Loader.shared;
class PixiContainer extends PIXI.Container {
}
class PixiRenderer {
    static init() {
        this.pixiStage.addChild(this.backCont);
        this.pixiStage.addChild(this.objCont);
        this.renderer = new PIXI.autoDetectRenderer({ view: canv, width: canv.width, height: canv.height, antialias: false, transparent: true, resolution: 1 });
        console.log('pixi init...');
    }
    static render() {
        this.renderer.render(this.pixiStage);
    }
    static addUrl(url) {
        this.urls.push(url);
    }
    static moveObj(pix, newY) {
        let rem = this.objCont.removeChild(pix);
        if (!rem)
            throw new Error('where s my child!? Error');
        let a = 0, b = this.objCont.children.length;
        let c = ~~((a + b) / 2);
        while (b - a > 0) {
            if (this.objCont.getChildAt(c).obj.fy < pix.obj.fy)
                a = c + 1;
            else
                b = c;
            c = ~~((a + b) / 2);
        }
        this.objCont.addChildAt(pix, c);
    }
    static load() {
        let res = { complete: false, loaded: 0, all: this.urls.length };
        let complLoad = () => { res.complete = true; this.render(); };
        let loadNext = () => {
            res.loaded = res.all - this.urls.length;
            console.log('load..');
            if (this.urls.length) {
                pixiLoader.add(this.urls.pop()).load(() => { setTimeout(loadNext.bind(this), 1); });
            }
            else
                complLoad();
        };
        loadNext();
        return res;
    }
}
PixiRenderer.pixiStage = new PIXI.Container();
PixiRenderer.objCont = new PIXI.Container();
PixiRenderer.backCont = new PIXI.Container();
PixiRenderer.urls = [];
class PixiAniSprite extends PIXI.Sprite {
    constructor(name, obj) {
        super(IMAGES[name].pixitexs[0]);
        this.name = name;
        this.obj = obj;
        this.w = 0;
        this.h = 0;
        this.textures = [[]];
        this.state = 0;
        this.pos = 0;
        this.timePerFr = 100;
        this.lastTick = 0;
        PixiRenderer.objCont.addChild(this);
        let txs = IMAGES[name].pixitexs;
        for (let j = 0; j < txs.length; j++) {
            let t = txs[j];
            this.textures[0][j] = t;
            if (t.width > this.w)
                this.w = t.width;
            if (t.height > this.h)
                this.h = t.height;
        }
        this.anchor = { x: .5, y: 0.5 }; //also pivot can be used, but it shd change for evr new texture
        // this.pivot.set(0, 0*DRAW.cellS/2);
    }
    // constructor(private name:string, public obj:FieldObj){
    //     super(TextureCache[texNames[0][0]]);
    //     PixiRenderer.objCont.addChild(this);
    //     for(let j=0; j<texNames.length;j++)
    //     for(let i=0; i<texNames[j].length; i++){
    //         let t = TextureCache[texNames[j][i]];
    //         if(!this.textures[j])this.textures[j]=[];
    //         this.textures[j][i]=t;
    //         if(t.width>this.w)this.w = t.width;
    //         if(t.height>this.h)this.h = t.height;
    //     }
    //     this.anchor = {x:.5, y:1};	//also pivot can be used, but it shd change for evr new texture
    // }
    step(x, y, scaleX) {
        this.x = x;
        this.y = y;
        this.lastTick += deltaTime.delta;
        if (this.lastTick > this.timePerFr) {
            this.pos = (this.pos + ~~(this.lastTick / this.timePerFr)) % this.textures[this.state].length;
            this.lastTick %= this.timePerFr;
            this.updateTexture();
        }
        this.scale.x = scaleX;
    }
    changeState(st) {
        if (!this.textures[st])
            throw new Error('pixi: no such state!');
        if (this.state != st) {
            this.pos = 0;
            this.state = st;
            this.updateTexture();
        }
    }
    updateTexture() {
        this.texture = this.textures[this.state][this.pos];
    }
}
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
export { DRAW, Face, TextBox, PixiRenderer };
//# sourceMappingURL=draw.js.map