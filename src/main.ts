const gamesize = 800;

let oldAngle: number;
let earthImage: p5.Image;
let earthRotation: number = 0;
const earthSize = 256;

function preload() {
    earthImage = loadImage("/res/earth.png");	
}

function setup() {
	imageMode(CENTER);
    const height = windowHeight;
    const width = windowWidth;
    createCanvas(width, height);
    stroke(255);
    frameRate(60);
    noCursor();
}

function draw() {
    background(0);
    drawEarth();
    pointer();
}

function drawEarth() {
	push();
    const centerX = width / 2;
    const centerY = height / 2;
    translate(centerX, centerY)
	rotate(earthRotation);
    image(earthImage, 0, 0, earthSize, earthSize);
    earthRotation = earthRotation + 0.001;
    pop();
}

function pointer() {
    push();

    translate(mouseX, mouseY);
    noStroke();
    fill(255);

    rotate(pointerRotation());
    playerShape();

    pop();
}

function pointerRotation() {
    let x = mouseX - pmouseX;
    let y = mouseY - pmouseY;

    if (x === 0 && y === 0) {
        return oldAngle;
    }

    oldAngle = atan2(y, x);
    return oldAngle;
}

function playerShape() {
    //pointy boi
    // beginShape();
    // vertex(10, 0);
    // vertex(-5, 5);
    // vertex(-5, -5);
    // endShape(CLOSE);

    //pacman boi
    let mouthangle = PI / 5;
    arc(0, 0, gamesize / 20, gamesize / 20, mouthangle, -mouthangle);
}
