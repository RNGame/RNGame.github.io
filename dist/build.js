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
const gamesize = 800;
let oldAngle;
const earthSize = 256;
let meteorsPerSecond = 60;
const framesPerSecond = 60;
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
    frameRate(framesPerSecond);
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
    stars.forEach(star => star.draw());
    const shouldSpawnMeteor = frameCount % (framesPerSecond / meteorsPerSecond) === 0;
    if (shouldSpawnMeteor) {
        meteors.push(new Meteor(windowWidth + 400, random(PI * 2), width, height, earthSize, 50));
    }
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
class Meteor {
    constructor(radius, angle, width, height, earthsize, playersize) {
        this.earthX = width / 2;
        this.earthY = height / 2;
        this.startX = radius * cos(angle) + this.earthX;
        this.startY = radius * sin(angle) + this.earthY;
        let schnittpunkt = berechnungstuff(angle, [this.startX, this.startY]);
        [this.posX, this.posY] = schnittpunkt;
        [this.startX, this.startY] = schnittpunkt;
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
class Star {
    constructor(x, y) {
        this.posX = x;
        this.posY = y;
        this.width = 2;
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
//# sourceMappingURL=../src/src/build.js.map