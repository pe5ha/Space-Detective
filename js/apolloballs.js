import { mainctx, drawCircle, bgclr, canv, getRndClr } from "./main.js";
let msdown = false, crtTimer = 0, ee;
window.addEventListener("mousedown", (e) => {
    msdown = true;
});
window.addEventListener("mousemove", (e) => {
    ee = e;
});
window.addEventListener("mouseup", (e) => {
    msdown = false;
});
function newBall({ x, y, vx = 0, vy = 0, r, clr = getRndClr(), par = parball }) {
    return { x, y, vx, vy, r, clr, par };
}
let parball;
let balls = [], deadBalls = [];
export function initApolloBalls() {
    parball = { x: canv.width / 2, y: canv.height / 2, vx: 0, vy: 0, r: Math.min(canv.width, canv.height) / 2, clr: "#333333", par: null };
}
export function drawApolloBalls() {
    if (msdown)
        if (++crtTimer > 2) {
            crtTimer = 0;
            balls.push(newBall({ x: ee.clientX, y: ee.clientY, r: 5 }));
        }
    mainctx.fillStyle = bgclr;
    mainctx.fillRect(0, 0, canv.width, canv.height);
    drawCircle(mainctx, parball.x, parball.y, parball.r, parball.clr);
    for (let ba of balls) {
        moveB(ba);
    }
    arrRemAll(balls, (b) => (deadBalls.indexOf(b) >= 0));
    deadBalls = [];
    for (let ba of balls) {
        drawCircle(mainctx, ba.x, ba.y, ba.r, ba.clr, 3);
    }
    function moveB(b) {
        b.x += b.vx;
        b.y += b.vy;
        b.vx *= .9;
        b.vy *= .9;
        let pd = dist(b.par.x - b.x, b.par.y - b.y), psin = (b.par.y - b.y) / pd, pcos = (b.par.x - b.x) / pd, pover = pd - b.par.r + b.r;
        if (pover > 0) {
            b.x += pover * pcos;
            b.y += pover * psin;
        } //repel(b,b.par,pcos,psin,pover*b.par.r*b.r*.01);
        let overs = 0;
        for (let ob of balls) {
            if (ob.r <= b.r)
                continue;
            let d = dist(ob.x - b.x, ob.y - b.y), sin = (ob.y - b.y) / d, cos = (ob.x - b.x) / d, over = -d + ob.r + b.r;
            if (over > 0) {
                repel(b, ob, cos, sin, -over * b.par.r * b.r * .01);
                overs++;
            }
        }
        b.r += 0.005 * Math.abs(b.par.x - b.x);
        if (overs == 0)
            b.r = Math.min(b.par.r * .7, b.r + 1);
        if (overs >= 2 || pover > 0 && overs >= 1) {
            b.r--;
        }
        if (b.r < 1)
            deadBalls.push(b);
        function repel(b1, b2, cos, sin, p) {
            let coe = p / b1.r * .01;
            b1.vx += cos * coe;
            b1.vy += sin * coe;
            // coe=p/b2.r*.01;
            // b2.vx-=cos*coe;b2.vy-=sin*coe;
            // b.vx+=cos*p*.01;b.vy+=sin*p*.01;
            // b.vx=Math.abs(cos)*p*.1;b.vy=Math.abs(sin)*p*.1;
            // b.vx+=Math.abs(cos)*p*.1;b.vy+=Math.abs(sin)*p*.1;
        }
    }
}
//removes all elements, which satisfy condition
export function arrRemAll(arr, fun, remFun = null) {
    let i = 0;
    while (i < arr.length)
        if (fun(arr[i]))
            if (remFun)
                remFun(arr, i);
            else
                arr.splice(i, 1);
        else
            i++;
}
export function dist(dx, dy) { return Math.sqrt(dx * dx + dy * dy); }
//# sourceMappingURL=apolloballs.js.map