import p5 from "p5";

export class Star{
    constructor(x: number, y: number){
        this.posX = x;
        this.posY = y;

        this.size = 2;
    }

    posX: number;
    posY: number;
    size: number;

    draw(p: p5){
        p.push();

        p.noStroke();
        p.fill(255);
        p.ellipseMode(p.CENTER);
        p.ellipse(this.posX, this.posY, this.size) 

        p.pop();
    }
}