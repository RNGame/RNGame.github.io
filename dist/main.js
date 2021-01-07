const gamesize = 800;
let oldAngle;
const earthSize = 256;
const earth = new Earth(earthSize);
let player;
let meteors;
let stars;
let impacts;
let sound_nom;
let sound_oof;
function preload() {
    earth.earthImage = loadImage("/res/earth.png");
    sound_nom = new p5.SoundFile("/res/nom.mp3");
    sound_oof = new p5.SoundFile("/res/oof.mp3");
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
    stars = [];
    impacts = [];
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
    stars.forEach(star => star.draw());
    meteors.push(new Meteor(gamesize + gamesize / 2, random(PI * 2), width, height, earthSize, 50));
    meteors.forEach(meteor => {
        if (meteor.stateImpact) {
            removeMeteor(meteor);
            impacts.push(new Impact(meteor.posX, meteor.posY, meteor.meteorSize * 2));
        }
        if (meteor.stateEaten) {
            removeMeteor(meteor);
            stars.push(new Star(meteor.posX, meteor.posY));
        }
        meteor.draw();
    });
    impacts.forEach(impact => {
        if (impact.stateFinished) {
            let idx = impacts.indexOf(impact);
            impacts.splice(idx, 1);
            return;
        }
        impact.draw();
    });
}
//# sourceMappingURL=../src/src/main.js.map