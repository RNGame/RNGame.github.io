const gamesize = 800;

let oldAngle: number;

const earthSize = 256;

const earth = new Earth(earthSize);
let player: Player;
let meteors: Meteor[];

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
	frameRate();
    noCursor();
    
    player = new Player(gamesize);
    meteors = [];
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
    
    meteors.push(new Meteor(gamesize+gamesize/2, random(PI * 2), width, height, earthSize, 50));
    meteors.forEach(meteor => {
        if(meteor.stateImpact || meteor.stateEaten){
            removeMeteor(meteor);
        }
            
        meteor.draw();
        
    });

    console.log(meteors.length);
}