import p5 from "p5";

export class Marker{
    constructor(x: number, y: number){
        this.posX = x;
        this.posY = y;
    }

    posX: number;
    posY: number;
    size = 20;

    draw(p: p5){
        p.push();

        p.noStroke();
        p.ellipseMode(p.CENTER);
        p.fill(255, 255, 0);
        p.ellipse(this.posX, this.posY, this.size);

        p.pop();
    }
}