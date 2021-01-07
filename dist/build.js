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
        this.factor = 1000;
    }
    draw() {
        if (this.checkImpact())
            return;
        if (this.checkNom())
            return;
        push();
        noStroke();
        fill(255, 0, 0);
        ellipseMode(CENTER);
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