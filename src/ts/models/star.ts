import p5 from "p5";

export class Star{
    constructor(x: number, y: number, sizescale: number){
        this.posX = x;
        this.posY = y;

        this.size = 4 * sizescale;
        
        this.counter = 0;
        this.countup = true;
    }

    posX: number;
    posY: number;
    size: number;

    counter: number;
    countup: boolean;
    animationlength = 100;
    opacity = 255;

    draw(p: p5){
        if(this.countup){
            this.counter++;
            this.countup = this.counter < this.animationlength;
        }else{
            this.counter--;
            this.countup = this.counter <= 0;
        }

        let opacity = this.opacity - this.opacity / this.animationlength * this.counter;

        p.push();

        p.noStroke();
        p.fill(255, opacity);
        p.ellipseMode(p.CENTER);
        p.ellipse(this.posX, this.posY, this.size) 

        p.pop();
    }
}

export class Starlist{
    constructor(){
        this.stars = [];
    }

    stars: Star[];
    maxstars = 10000;

    push(star: Star){
        if(this.stars.length >= this.maxstars){
            this.stars.pop();
        }

        this.stars.push(star);
    }

    draw(p: p5){
        this.stars.forEach(star => star.draw(p));
    }
}