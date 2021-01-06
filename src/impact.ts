class Impact{
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

    draw(){
        if(this.counter >= 5){
            this.stateFinished = true;
            return;
        }
        this.counter++;

        push();
        
        noStroke();
        fill(255, 255, 0);
        ellipseMode(CENTER);
        ellipse(this.posX, this.posY, this.width);

        pop();
    }
}