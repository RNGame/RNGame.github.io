import p5 from "p5";

export class Player {
    constructor(gamesize: number) {
        this.gamesize = gamesize;
    }

    gamesize: number;
    oldAngle: number;
    
    draw(p: p5) {
        this.pointer(p);
    }

    private pointer(p: p5) {
        p.push();
    
        p.translate(p.mouseX, p.mouseY);
        p.noStroke();
        p.fill(255);
    
        p.rotate(this.pointerRotation(p));
        this.playerShape(p);
    
        p.pop();
    }
    
    private pointerRotation(p: p5) {
        let x = p.mouseX - p.pmouseX;
        let y = p.mouseY - p.pmouseY;
    
        if (x === 0 && y === 0) {
            return this.oldAngle;
        }
    
        this.oldAngle = p.atan2(y, x);
        return this.oldAngle;
    }
    
    private playerShape(p: p5) {
        //pointy boi
        // beginShape();
        // vertex(10, 0);
        // vertex(-5, 5);
        // vertex(-5, -5);
        // endShape(CLOSE);
    
        //pacman boi
        let mouthangle = p.PI / 5;
        p.arc(0, 0, this.gamesize / 20, this.gamesize / 20, mouthangle, -mouthangle);
    }
}