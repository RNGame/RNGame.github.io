const gamesize = 800;

const height = gamesize;
const width = gamesize;

const earthsize = gamesize / 10;

let radius;
let meteors = [];

function setup(){
    createCanvas(width, height);
    stroke(255);
    frameRate(1);

    radius = sqrt(pow(width/2, 2) + pow(height/2, 2));

    
}

function draw(){
    background("#090909");

    fill("#0080c0");
    ellipse(width/2, height/2, earthsize);

    meteors.push(meteor());
    meteors.forEach(x => {
        x.draw();
    });
}

function meteor(){
    const angle = random(PI * 2); //random winkel

    return new Meteor(radius, angle, width/2, height/2);
}

class Meteor{
    constructor(radius, angle, earthX, earthY){
        this.meteorX = radius * cos(angle) + earthX;
        this.meteorY = radius * sin(angle) + earthY;

        this.earthX = earthX;
        this.earthY = earthY;
    }

    draw(){
        line(this.meteorX, this.meteorY, this.earthX, this.earthY);
    }
}


