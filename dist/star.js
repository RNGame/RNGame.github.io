class Star {
    constructor(x, y) {
        this.posX = x;
        this.posY = y;
        this.width = 10;
    }
    draw() {
        push();
        noStroke();
        fill(255);
        ellipseMode(CENTER);
        ellipse(this.posX, this.posY, this.width);
        pop();
    }
}
//# sourceMappingURL=../src/src/star.js.map