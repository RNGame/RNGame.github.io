const gamesize = 800;
let oldAngle;
const earthSize = 256;
const earth = new Earth(earthSize);
let player;
function preload() {
    earth.earthImage = loadImage("/res/earth.png");
}
function setup() {
    imageMode(CENTER);
    const height = windowHeight;
    const width = windowWidth;
    createCanvas(width, height);
    stroke(255);
    frameRate(60);
    noCursor();
    player = new Player(gamesize);
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
function draw() {
    background(0);
    earth.draw();
    player.draw();
}
//# sourceMappingURL=../src/src/main.js.map