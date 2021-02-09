import p5 from "p5";

export class Impact{
    constructor(x: number, y: number, width: number){
        this.posX = x;
        this.posY = y;
        this.width = width;

        this.counter = 0;
        this.stateFinished = false;
    }

    posX: number;
    posY: number;
    width: number;
    counter: number;
    stateFinished: boolean;

    draw(p: p5){
        if(this.counter >= 5){
            this.stateFinished = true;
            return;
        }
        this.counter++;

        p.push();
        
        p.noStroke();
        p.fill(255, 255, 0);
        p.ellipseMode(p.CENTER);
        p.ellipse(this.posX, this.posY, this.width);

        p.pop();
    }
}