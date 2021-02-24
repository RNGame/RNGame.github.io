import p5 from "p5";
import { Impact } from "./impact";
import { Star, Starlist } from "./star";
import { Direction } from "./marker";

export class Meteor {
  constructor(
    rng_values: {
      angle?: number,
      speed?: number,
      size?: number,
    },
    width: number, //width of the screen
    height: number, //height of the screen
    earthsize: number,
    playersize: number,
    image: p5.Image
  ) {
    let angle = this.sanitize_angle(rng_values.angle || Math.random() * 2*Math.PI); //default, uniform distribution
    this.sizeFactor = rng_values.size || 1; //0.5: small, 2: big
    this.speedFactor = rng_values.speed || 1000; //10: super fast, 10000: super slow
    
    this.earthX = width / 2;
    this.earthY = height / 2;

    let radius = width >= height ? width : height;
    let startX = radius * Math.cos(angle) + this.earthX;
    let startY = radius * Math.sin(angle) + this.earthY;

    this.eckangle = Math.atan2(height, width); //winkel von mitte des bildschirms zu einer ecke
    [this.posX, this.posY] = this.calcute_entrypoint(angle, [startX, startY], width, height);

    this.distX = this.posX - this.earthX; //distance from earth
    this.distY = this.posY - this.earthY; //distance from earth

    this.meteorSize = 42 * this.sizeFactor;
    this.earthsSize = earthsize / 2;
    this.playerSize = playersize / 2;

    this.stateImpact = this.stateEaten = false;

    this.image = image;
  }

  posX: number;
  posY: number;

  earthX: number;
  earthY: number;

  distX: number;
  distY: number;

  direction: Direction;

  meteorSize: number;
  earthsSize: number;
  playerSize: number;

  stateImpact: boolean;
  stateEaten: boolean;

  speedFactor: number;
  sizeFactor: number;

  image: p5.Image;

  private eckangle: number;

  draw(p: p5) {
    if (this.checkImpact()) return;
    if (this.checkNom(p)) return;

    p.push();

    //meteor
    p.image(this.image, this.posX, this.posY, this.meteorSize, this.meteorSize);

    p.pop();

    this.posX -= this.distX / this.speedFactor;
    this.posY -= this.distY / this.speedFactor;
  }

  private checkImpact(): boolean {
    let abstand = Math.sqrt(
      Math.pow(this.posX - this.earthX, 2) +
        Math.pow(this.posY - this.earthY, 2)
    );
    if (abstand <= this.earthsSize) {
      this.stateImpact = true;
      return true;
    }
    return false;
  }

  private checkNom(p: p5) {
    let abstand = Math.sqrt(
      Math.pow(this.posX - p.mouseX, 2) + Math.pow(this.posY - p.mouseY, 2)
    );
    if (abstand <= this.playerSize) {
      this.stateEaten = true;
      return true;
    }
    return false;
  }

  //makes sure the angle is between 0 and 2 PI
  private sanitize_angle(angle: number){
    if(angle > 0){
      return angle % (2*Math.PI);
    }else{
      let sanitized = angle;
      while(sanitized < 0){
        sanitized += 2*Math.PI;
      }
      return sanitized;
    }
  }

  //zur berechnung des schnittpunktes mit der außenkante des spielfelds
  private line_intersection(p1: number[], p2: number[], p3: number[], p4: number[]): number[] {
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

  //calculates from which wall/outside edge the meteor enters the game
  private calcute_entrypoint(angle: number, point: number[], width: number, height: number): number[] {
    if (angle <= this.eckangle || angle >= 2 * Math.PI - this.eckangle) {
      //rechte wand ... east
      this.direction = Direction.East;
      return this.line_intersection([this.earthX, this.earthY], point, [width, 0], [width, height]); // earth, meteorstart, wand_p1, wand_p2
    } else if (angle <= Math.PI - this.eckangle) {
      //untere wand ... south
      this.direction = Direction.South;
      return this.line_intersection([this.earthX, this.earthY], point, [0, height], [width, height]);
    } else if (angle <= 1.5 * Math.PI - (Math.PI / 2 - this.eckangle)) {
      //linke wand ... west
      this.direction = Direction.West;
      return this.line_intersection([this.earthX, this.earthY], point, [0, 0], [0, height]);
    } else {
      //obere wand ... north
      this.direction = Direction.North;
      return this.line_intersection([this.earthX, this.earthY], point, [0, 0], [width, 0]);
    }
  }
}

export class Meteorlist{
  constructor(explosionImage: p5.Image){
    this.meteors = [];
    this.impacts = [];
    this.stars = new Starlist();

    this.meteorseaten = 0;

    this.explosionImage = explosionImage;
  }

  meteors: Meteor[];
  impacts: Impact[];
  stars: Starlist;

  meteorseaten: number;
  meteorsImpacted: number = 0;

  explosionImage: p5.Image;

  draw(p: p5){
    //draw stars
    this.stars.draw(p);

    //draw meteors
    this.meteors.forEach((meteor) => {
      if (meteor.stateImpact) {
        this.removeMeteor(meteor);
        this.meteorsImpacted++;
        this.impacts.push(new Impact(meteor.posX, meteor.posY, meteor.meteorSize * 4, this.explosionImage));
      }
      if (meteor.stateEaten) {
        this.meteorseaten++;
        this.removeMeteor(meteor);
        this.stars.push(new Star(meteor.posX, meteor.posY, meteor.sizeFactor));
      }

      meteor.draw(p);
    });

    //draw impacts
    this.impacts.forEach((impact) => {
      if (impact.stateFinished) {
        let idx = this.impacts.indexOf(impact);
        this.impacts.splice(idx, 1);
        return;
      }

      impact.draw(p);
    });
  }

  push(meteor: Meteor){
      this.meteors.push(meteor);
  }

  private removeMeteor(meteor: Meteor){
    let idx = this.meteors.indexOf(meteor);
    this.meteors.splice(idx, 1);
  }
}
