import p5 from "p5";

export class Meteor {
  constructor(
    radius: number,
    angle: number,
    width: number,
    height: number,
    earthsize: number,
    playersize: number,
    image: p5.Image
  ) {
    this.earthX = width / 2;
    this.earthY = height / 2;

    this.startX = radius * Math.cos(angle) + this.earthX;
    this.startY = radius * Math.sin(angle) + this.earthY;

    this.eckangle = Math.atan2(height, width);
    let schnittpunkt = this.calcute_entrypoint(angle, [this.startX, this.startY], width, height);
    [this.posX, this.posY] = schnittpunkt;
    [this.startX, this.startY] = schnittpunkt;

    this.meteorSize = 42;
    this.earthsSize = earthsize / 2;
    this.playerSize = playersize / 2;

    this.stateImpact = this.stateEaten = false;

    this.factor = 1000;
    this.image = image;
  }

  startX: number;
  startY: number;

  posX: number;
  posY: number;

  earthX: number;
  earthY: number;

  meteorSize: number;
  earthsSize: number;
  playerSize: number;

  stateImpact: boolean;
  stateEaten: boolean;

  factor: number;

  image: p5.Image;

  private eckangle: number;

  draw(p: p5) {
    if (this.checkImpact()) return;
    if (this.checkNom(p)) return;

    p.push();

    //meteor
    p.image(this.image, this.posX, this.posY, this.meteorSize, this.meteorSize);

    const distX = this.startX - this.earthX;
    const distY = this.startY - this.earthY;

    this.posX -= distX / this.factor;
    this.posY -= distY / this.factor;

    p.pop();
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

  //zur berechnung des schnittpunktes mit der außenkante des spielfelds
  private line_intersection(p1: number[], p2: number[], p3: number[], p4: number[]) {
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
  private calcute_entrypoint(angle: number, point: number[], width: number, height: number) {
    if (angle <= this.eckangle || angle >= 2 * Math.PI - this.eckangle) {
      //rechte wand
      return this.line_intersection([this.earthX, this.earthY], point, [width, 0], [width, height]); // earth, meteorstart, wand_p1, wand_p2
    } else if (angle <= Math.PI - this.eckangle) {
      //untere wand
      return this.line_intersection([this.earthX, this.earthY], point, [0, height], [width, height]);
    } else if (angle <= 1.5 * Math.PI - (Math.PI / 2 - this.eckangle)) {
      //linke wand
      return this.line_intersection([this.earthX, this.earthY], point, [0, 0], [0, height]);
    } else {
      //obere wand
      return this.line_intersection([this.earthX, this.earthY], point, [0, 0], [width, 0]);
    }
  }
}
