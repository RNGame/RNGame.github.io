class Player {
    constructor(gamesize: number) {
        this.gamesize = gamesize;
    }

    gamesize: number;
    oldAngle: number;
    
    draw() {
        this.pointer();
    }

    private pointer() {
        push();
    
        translate(mouseX, mouseY);
        noStroke();
        fill(255);
    
        rotate(this.pointerRotation());
        this.playerShape();
    
        pop();
    }
    
    private pointerRotation() {
        let x = mouseX - pmouseX;
        let y = mouseY - pmouseY;
    
        if (x === 0 && y === 0) {
            return this.oldAngle;
        }
    
        this.oldAngle = atan2(y, x);
        return this.oldAngle;
    }
    
    private playerShape() {
        //pointy boi
        // beginShape();
        // vertex(10, 0);
        // vertex(-5, 5);
        // vertex(-5, -5);
        // endShape(CLOSE);
    
        //pacman boi
        let mouthangle = PI / 5;
        arc(0, 0, this.gamesize / 20, this.gamesize / 20, mouthangle, -mouthangle);
    }
}