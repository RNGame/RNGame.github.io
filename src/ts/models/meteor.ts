import p5 from "p5";

export class Meteor {
  constructor(
    radius: number,
    angle: number,
    width: number,
    height: number,
    earthsize: number,
    playersize: number
  ) {
    this.earthX = width / 2;
    this.earthY = height / 2;

    this.startX = radius * Math.cos(angle) + this.earthX;
    this.startY = radius * Math.sin(angle) + this.earthY;

    //let schnittpunkt = berechnungstuff(angle, [this.startX, this.startY]);
    let schnittpunkt: number[] = [1,1];
    [this.posX, this.posY] = schnittpunkt;
    [this.startX, this.startY] = schnittpunkt;

    this.meteorSize = 25;
    this.earthsSize = earthsize / 2;
    this.playerSize = playersize / 2;

    this.stateImpact = this.stateEaten = false;

    this.factor = 1000;
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

  draw(p: p5) {
    if (this.checkImpact()) return;
    if (this.checkNom(p)) return;

    p.push();

    p.noStroke();

    //randmarkierung
    p.ellipseMode(p.CENTER);
    p.fill(255, 255, 0);
    p.ellipse(this.startX, this.startY, 20);

    //meteor
    p.fill(255, 0, 0);
    p.ellipse(this.posX, this.posY, this.meteorSize);

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
}
