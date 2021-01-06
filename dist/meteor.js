class Meteor {
    constructor(radius, angle, width, height, earthsize, playersize) {
        this.earthX = width / 2;
        this.earthY = height / 2;
        this.startX = radius * cos(angle) + this.earthX;
        this.startY = radius * sin(angle) + this.earthY;
        this.posX = this.startX;
        this.posY = this.startY;
        this.meteorSize = 25;
        this.earthsSize = earthsize / 2;
        this.playerSize = playersize / 2;
        this.stateImpact = this.stateEaten = false;
    }
    draw() {
        let abstand = Math.sqrt(Math.pow(this.posX - this.earthX, 2) + Math.pow(this.posY - this.earthY, 2));
        if (abstand <= this.earthsSize) {
            this.stateImpact = true;
            this.impact();
            return;
        }
        abstand = Math.sqrt(Math.pow(this.posX - mouseX, 2) + Math.pow(this.posY - mouseY, 2));
        if (abstand <= this.playerSize) {
            this.stateEaten = true;
            this.nom();
            return;
        }
        push();
        noStroke();
        fill(255, 0, 0);
        ellipseMode(CENTER);
        ellipse(this.posX, this.posY, this.meteorSize);
        const factor = 1000;
        const distX = this.startX - this.earthX;
        const distY = this.startY - this.earthY;
        this.posX -= distX / factor;
        this.posY -= distY / factor;
        pop();
    }
    impact() {
    }
    nom() {
    }
}
//# sourceMappingURL=../src/src/meteor.js.map