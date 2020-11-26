const gamesize = 800;

const height = gamesize;
const width = gamesize;

function setup(){
    createCanvas(width, height);
    stroke(255);
    frameRate(60);
    noCursor();

}

function draw(){
    background(0);
    pointer();
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

let oldAngle;
function pointerRotation(){
    let x = mouseX - pmouseX;
    let y = mouseY - pmouseY;

    if(x === 0 && y === 0){
        return oldAngle;
    }

    oldAngle = atan2(y, x);;
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
    let mouthangle = PI/5;
    arc(0, 0, gamesize/20, gamesize/20, mouthangle, -mouthangle);
}



