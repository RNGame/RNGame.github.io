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

let eckangle: number;

const uniformProb = new UniformDistribution(Math.random, 0, 360);

/*
let sound_nom: p5.SoundFile;
let sound_oof: p5.SoundFile; 
*/

function preload() {
  earth.earthImage = loadImage("/res/earth.png");
  /*
    sound_nom = new p5.SoundFile("/res/nom.mp3");
    sound_oof = new p5.SoundFile("/res/oof.mp3");
    */
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

async function removeMeteor(meteor: Meteor) {
  let idx = meteors.indexOf(meteor);
  meteors.splice(idx, 1);
}

function draw() {
  background(0);
  earth.draw();
  player.draw();

  stars.forEach((star) => star.draw());

  const shouldSpawnMeteor =
    frameCount % (framesPerSecond / meteorsPerSecond) === 0;
  if (shouldSpawnMeteor) {
    meteors.push(
      new Meteor(windowWidth + 400, random(PI * 2), width, height, earthSize, 50)
    );
  }

  meteors.forEach((meteor) => {
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

  impacts.forEach((impact) => {
    if (impact.stateFinished) {
      let idx = impacts.indexOf(impact);
      impacts.splice(idx, 1);
      return;
    }

    impact.draw();
  });

  console.log(uniformProb.random());
}

//i will refactor this later
function line_intersection(p1: number[], p2: number[], p3: number[], p4: number[]) {
  let xdiff = [p1[0] - p2[0], p3[0] - p4[0]];
  let ydiff = [p1[1] - p2[1], p3[1] - p4[1]];

  function det(a: number[], b: number[]) {
    return a[0] * b[1] - a[1] * b[0];
  }

  let div = det(xdiff, ydiff);
  //if det 0 kein, schnittpunkt

  let d = [det(p1, p2), det(p3, p4)];
  let x = det(d, xdiff) / div;
  let y = det(d, ydiff) / div;

  return [x, y];
}

//i will refactor this later
function berechnungstuff(angle: number, point: number[]) {
  if (angle <= eckangle || angle >= 2 * PI - eckangle) {
    //rechte wand
    return line_intersection([width / 2, height / 2], point, [width, 0], [width, height]); // earth, meteorstart, wand_p1, wand_p2
  } else if (angle <= PI - eckangle) {
    //untere wand
    return line_intersection([width / 2, height / 2], point, [0, height], [width, height]);
  } else if (angle <= 1.5 * PI - (PI / 2 - eckangle)) {
    //linke wand
    return line_intersection([width / 2, height / 2], point, [0, 0], [0, height]);
  } else {
    //obere wand
    return line_intersection([width / 2, height / 2], point, [0, 0], [width, 0]);
  }
}
