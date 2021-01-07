class Meteor {
    constructor(radius, angle, width, height, earthsize, playersize) {
        this.earthX = width / 2;
        this.earthY = height / 2;
        this.startX = radius * cos(angle) + this.earthX;
        this.startY = radius * sin(angle) + this.earthY;
        let schnittpunkt = berechnungstuff(angle, [this.startX, this.startY]);
        this.posX = schnittpunkt[0];
        this.posY = schnittpunkt[1];
        this.startX = schnittpunkt[0];
        this.startY = schnittpunkt[1];
        this.meteorSize = 25;
        this.earthsSize = earthsize / 2;
        this.playerSize = playersize / 2;
        this.stateImpact = this.stateEaten = false;
        this.factor = 1000;
    }
    draw() {
        if (this.checkImpact())
            return;
        if (this.checkNom())
            return;
        push();
        noStroke();
        ellipseMode(CENTER);
        fill(255, 255, 0);
        ellipse(this.startX, this.startY, 20);
        fill(255, 0, 0);
        ellipse(this.posX, this.posY, this.meteorSize);
        const distX = this.startX - this.earthX;
        const distY = this.startY - this.earthY;
        this.posX -= distX / this.factor;
        this.posY -= distY / this.factor;
        pop();
    }
    checkImpact() {
        let abstand = Math.sqrt(Math.pow(this.posX - this.earthX, 2) + Math.pow(this.posY - this.earthY, 2));
        if (abstand <= this.earthsSize) {
            this.stateImpact = true;
            sound_oof.play();
            return true;
        }
        return false;
    }
    checkNom() {
        let abstand = Math.sqrt(Math.pow(this.posX - mouseX, 2) + Math.pow(this.posY - mouseY, 2));
        if (abstand <= this.playerSize) {
            this.stateEaten = true;
            sound_nom.play();
            return true;
        }
        return false;
    }
}
//# sourceMappingURL=../src/src/meteor.js.map