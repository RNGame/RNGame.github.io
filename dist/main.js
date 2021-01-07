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
let eckangle;
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
    eckangle = atan2(height, width);
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
    line(0, 0, width / 2, height / 2);
    meteors.push(new Meteor(windowWidth + 400, random(PI * 2), width, height, earthSize, 50));
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
    stars.forEach(star => star.draw());
    impacts.forEach(impact => {
        if (impact.stateFinished) {
            let idx = impacts.indexOf(impact);
            impacts.splice(idx, 1);
            return;
        }
        impact.draw();
    });
}
function line_intersection(p1, p2, p3, p4) {
    let xdiff = [p1[0] - p2[0], p3[0] - p4[0]];
    let ydiff = [p1[1] - p2[1], p3[1] - p4[1]];
    function det(a, b) {
        return a[0] * b[1] - a[1] * b[0];
    }
    let div = det(xdiff, ydiff);
    let d = [det(p1, p2), det(p3, p4)];
    let x = det(d, xdiff) / div;
    let y = det(d, ydiff) / div;
    return [x, y];
}
function berechnungstuff(angle, point) {
    if (angle <= eckangle || angle >= 2 * PI - eckangle) {
        return line_intersection([width / 2, height / 2], point, [width, 0], [width, height]);
    }
    else if (angle <= PI - eckangle) {
        return line_intersection([width / 2, height / 2], point, [0, height], [width, height]);
    }
    else if (angle <= 1.5 * PI - (PI / 2 - eckangle)) {
        return line_intersection([width / 2, height / 2], point, [0, 0], [0, height]);
    }
    else {
        return line_intersection([width / 2, height / 2], point, [0, 0], [width, 0]);
    }
}
//# sourceMappingURL=../src/src/main.js.map