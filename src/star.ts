class Star{
    constructor(x: number, y: number){
        this.posX = x;
        this.posY = y;

        this.width = 2;
    }

    posX: number;
    posY: number;
    width: number;

    draw(){
        push();

        noStroke();
        fill(255);
        ellipseMode(CENTER);
        ellipse(this.posX, this.posY, this.width)

        pop();
    }
}