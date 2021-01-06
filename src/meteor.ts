class Meteor{
    constructor(radius: number, angle: number, width: number, height: number, earthsize: number, playersize: number){
        this.earthX = width/2;
        this.earthY = height/2;
        
        this.startX = radius * cos(angle) + this.earthX;
        this.startY = radius * sin(angle) + this.earthY;

        this.posX = this.startX;
        this.posY = this.startY

        this.meteorSize = 25;
        this.earthsSize = earthsize/2;
        this.playerSize = playersize/2;

        this.stateImpact = this.stateEaten = false;

        this.factor = 1000;
    }

    startX: number;
    startY: number;

    posX: number;
    posY: number;

    earthX: number;
    earthY: number;

    meteorSize: number;
    earthsSize: number;
    playerSize: number;

    stateImpact: boolean;
    stateEaten: boolean;

    factor: number;
    
    draw(){
        push();

        let abstand = Math.sqrt(Math.pow(this.posX - this.earthX, 2) + Math.pow(this.posY - this.earthY, 2));
        if (abstand <= this.earthsSize){
            this.stateImpact = true;
            this.impact();
            return;
        }

        abstand = Math.sqrt(Math.pow(this.posX - mouseX, 2) + Math.pow(this.posY - mouseY, 2));
        if (abstand <= this.playerSize){
            this.stateEaten = true;
            this.nom();
            return;
        }

        
        noStroke();
        fill(255, 0, 0);
        ellipseMode(CENTER);
        ellipse(this.posX, this.posY, this.meteorSize);

        const distX = this.startX - this.earthX;
        const distY = this.startY - this.earthY;

        this.posX -= distX / this.factor;
        this.posY -= distY / this.factor;
        // line(this.startX, this.startY, this.earthX, this.earthY);

        pop();
    }

    private impact(){
        //boom goes the meteor
        noStroke();
        fill(255, 255, 0);
        ellipseMode(CENTER);
        ellipse(this.posX, this.posY, this.meteorSize*2);
    }

    private nom(){
        //nom the meteor

    }
}
