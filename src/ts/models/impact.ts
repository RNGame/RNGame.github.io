import p5 from "p5";

export class Impact{
    constructor(x: number, y: number, width: number, image: p5.Image){
        this.posX = x;
        this.posY = y;
        this.width = 1;
        this.maxWidth = width;

        this.counter = 0;
        this.stateFinished = false;
        this.explosionImage = image;
    }

    posX: number;
    posY: number;
    width: number;
    counter: number;
    stateFinished: boolean;
    explosionImage: p5.Image;
    maxWidth: number;
    scale = 5;
    animationLength = 20;

    draw(p: p5){
        if(this.counter >= this.animationLength){
            this.stateFinished = true;
            return;
        }

        if (this.width <= this.maxWidth) {
            this.width += 1.5 * this.scale;
        }
        
        this.counter++;

        p.push();
        
		p.image(this.explosionImage, this.posX, this.posY, this.width, this.width);

        p.pop();
    }
}