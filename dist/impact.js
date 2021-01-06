class Impact {
    constructor(x, y, width) {
        this.posX = x;
        this.posY = y;
        this.width = width;
        this.counter = 0;
        this.stateFinished = false;
    }
    draw() {
        if (this.counter >= 5) {
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
//# sourceMappingURL=../src/src/impact.js.map