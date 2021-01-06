const gamesize = 800;
let oldAngle;
const earthSize = 256;
const earth = new Earth(earthSize);
let player;
let meteors;
function preload() {
    earth.earthImage = loadImage("/res/earth.png");
}
function setup() {
    imageMode(CENTER);
    const height = windowHeight;
    const width = windowWidth;
    createCanvas(width, height);
    stroke(255);
    frameRate();
    noCursor();
    player = new Player(gamesize);
    meteors = [];
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
async function removeMeteor(meteor) {
    let idx = meteors.indexOf(meteor);
    meteors.splice(idx, 1);
}
function draw() {
    background(0);
    earth.draw();
    player.draw();
    meteors.push(new Meteor(gamesize + gamesize / 2, random(PI * 2), width, height, earthSize, 50));
    meteors.forEach(meteor => {
        if (meteor.stateImpact || meteor.stateEaten) {
            removeMeteor(meteor);
        }
        meteor.draw();
    });
    console.log(meteors.length);
}
//# sourceMappingURL=../src/src/main.js.map