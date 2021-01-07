const gamesize = 800;

let oldAngle: number;

const earthSize = 256;

let meteorsPerSecond = 60;
const framesPerSecond = 60;

const earth = new Earth(earthSize);
let player: Player;
let meteors: Meteor[];
let stars: Star[];
let impacts: Impact[];

let sound_nom: p5.SoundFile;
let sound_oof: p5.SoundFile; 

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
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}

async function removeMeteor(meteor: Meteor) {
	let idx = meteors.indexOf(meteor)
	meteors.splice(idx, 1)
}

function draw() {
	background(0);
	earth.draw();
    player.draw();

    stars.forEach(star => star.draw());
    
    const shouldSpawnMeteor = frameCount % (framesPerSecond / meteorsPerSecond) === 0
    if (shouldSpawnMeteor) {
        meteors.push(new Meteor(gamesize+gamesize/2, random(PI * 2), width, height, earthSize, 50));
    }
    
    meteors.forEach(meteor => {
        if(meteor.stateImpact){
            removeMeteor(meteor);
            impacts.push(new Impact(meteor.posX, meteor.posY, meteor.meteorSize*2));
        } 
        if(meteor.stateEaten){
            removeMeteor(meteor);
            stars.push(new Star(meteor.posX, meteor.posY));
        }

        meteor.draw();
    });

    impacts.forEach(impact => {
        if(impact.stateFinished){
            let idx = impacts.indexOf(impact);
            impacts.splice(idx, 1);
            return;
        }

        impact.draw();
    });
}
