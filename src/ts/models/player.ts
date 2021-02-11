import p5 from "p5";

export class Player {
    constructor(gamesize: number, image: p5.Image) {
        this.playersize = gamesize / this.playerscale;
        this.playerimage = image;
    }

    private playerimage: p5.Image
    private oldAngle: number;
    private playerscale = 40000;
    playersize: number;
    
    draw(p: p5) {
        this.pointer(p);
    }

    private pointer(p: p5) {
        p.push();
    
        p.translate(p.mouseX, p.mouseY);
        p.rotate(this.pointerRotation(p));
        // this.playerShape(p);
        p.image(this.playerimage, 0, 0, this.playersize, this.playersize);
    
        p.pop();
    }
    
    private pointerRotation(p: p5) {
        let x = p.mouseX - p.pmouseX; //derzeitige maus position - maus position vom frame davor
        let y = p.mouseY - p.pmouseY; //derzeitige maus position - maus position vom frame davor
    
        if (x === 0 && y === 0) {
            return this.oldAngle;
        }
    
        this.oldAngle = p.atan2(y, x);
        return this.oldAngle;
    }
    
    private playerShape(p: p5) {
        p.noStroke();
        p.fill(255);
        
        //pointy boi
        // beginShape();
        // vertex(10, 0);
        // vertex(-5, 5);
        // vertex(-5, -5);
        // endShape(CLOSE);
    
        //pacman boi
        let mouthangle = p.PI / 5;
        p.arc(0, 0, this.playersize, this.playersize, mouthangle, -mouthangle);
    }
}