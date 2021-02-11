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

        this.circlemarker(p);
        // this.gradientbox(p); //pretty laggy and doesnt look too good atm

        p.pop();
    }

    private circlemarker(p: p5){
        p.noStroke();
        p.ellipseMode(p.CENTER);
        p.fill(66, 239, 245);
        p.ellipse(this.posX, this.posY, this.size);
    }

    private gradientbox(p: p5){
        let color = p.color(255, 255, 0)
        let black = p.color(0);
        p.noFill();
        for (var w = 0; w < this.size; w++) {
            var inter = p.map(w, 0, this.size, 0, 1);
            var c = p.lerpColor(color, black, inter);
            p.stroke(c);
            p.rectMode(p.CENTER)
            p.square(this.posX, this.posY, w);
          }
    }
}