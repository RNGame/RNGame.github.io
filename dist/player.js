class Player {
    constructor(gamesize) {
        this.gamesize = gamesize;
    }
    draw() {
        this.pointer();
    }
    pointer() {
        push();
        translate(mouseX, mouseY);
        noStroke();
        fill(255);
        rotate(this.pointerRotation());
        this.playerShape();
        pop();
    }
    pointerRotation() {
        let x = mouseX - pmouseX;
        let y = mouseY - pmouseY;
        if (x === 0 && y === 0) {
            return this.oldAngle;
        }
        this.oldAngle = atan2(y, x);
        return this.oldAngle;
    }
    playerShape() {
        let mouthangle = PI / 5;
        arc(0, 0, this.gamesize / 20, this.gamesize / 20, mouthangle, -mouthangle);
    }
}
//# sourceMappingURL=../src/src/player.js.map