class Earth {
    constructor(earthSize) {
        this.earthRotation = 0;
        this.earthSize = earthSize;
    }
    draw() {
        push();
        const centerX = width / 2;
        const centerY = height / 2;
        translate(centerX, centerY);
        rotate(this.earthRotation);
        image(this.earthImage, 0, 0, this.earthSize, this.earthSize);
        this.earthRotation = this.earthRotation + 0.001;
        pop();
    }
}
//# sourceMappingURL=../src/src/earth.js.map