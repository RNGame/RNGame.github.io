const gamesize = 800;

let oldAngle: number;
let earthImage: p5.Image;
let earthRotation: number = 0;
const earthSize = 256;

let player: Player;

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
    
    player = new Player(gamesize);
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

function draw() {
	background(0);
	drawEarth();
	player.draw();
}

function drawEarth() {
	push();
	const centerX = width / 2;
	const centerY = height / 2;
	translate(centerX, centerY);
	rotate(earthRotation);
	image(earthImage, 0, 0, earthSize, earthSize);
	earthRotation = earthRotation + 0.001;
	pop();
}
