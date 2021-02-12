import p5 from "p5";
import { Distribution } from "./distributions/distribution";
import { ExponentialDistribution } from "./distributions/exponential";
import { Earth } from "./models/earth";
import { Impact } from "./models/impact";
import { Meteor } from "./models/meteor";
import { Marker } from "./models/marker";
import { Player } from "./models/player";
import { Star } from "./models/star";
import $ from "jquery";
import { GameControllerInterface } from "./gamecontroller_interface";
import Plotly from "plotly.js";
import { NormalDistribution } from "./distributions/normal";
import { UniformDistribution } from "./distributions/uniform";
import { RandomNumberGenerator } from "./distributions/rn_generator";
import { SliderInput, StaticInput } from "./distributions/generator_input";

export class RNGeddonController implements GameControllerInterface {
  constructor() {

    const mpsLabel = $(".meteorsPerSecond-label");
    mpsLabel.text(this.meteorsPerSecond);

    const self = this;
    $("#meteorsPerSecond").on("input", (event) => {
      const value = (<HTMLInputElement>event.target).value;
      self.meteorsPerSecond = +value;
      mpsLabel.text(self.meteorsPerSecond);
    });
  }
  //   private oldAngle: number;
  private earthSize = 256;

  private meteorsPerSecond = 5;
  private framesPerSecond = 60;

  private earth = new Earth(this.earthSize);
  private player: Player;

  private meteors: Meteor[];
  private markers: Marker[];
  private stars: Star[];
  private impacts: Impact[];

  private explosionImage: p5.Image;
  private meteorImage: p5.Image;
  private playerImage: p5.Image;

  private score: number = 0;

  private meteorAngleProbability: RandomNumberGenerator = new RandomNumberGenerator("meteorAngleContainer", "Meteor Angle", "Degrees", "Count", {
    mean: new SliderInput(0, Math.PI * 2, Math.PI, "Mean", "meteorAngleContainer", 0.1),
    sd: new SliderInput(0, Math.PI, Math.PI / 2, "Standard deviation", "meteorAngleContainer", 0.1),
    min: new StaticInput(0),
    max: new StaticInput(2 * Math.PI),
  })

  private addToScore(add: number) {
    this.score += add;
    $(".score").text(this.score);
  }

  private async removeMeteor(meteor: Meteor) {
    let idx = this.meteors.indexOf(meteor);
    this.meteors.splice(idx, 1);
  }

  private sketch = (p: p5) => {
    p.preload = () => {
      this.earth.earthImage = p.loadImage("/res/earth.png");
      this.explosionImage = p.loadImage("/res/explosion.png");
      this.meteorImage = p.loadImage("/res/meteor.gif");
      this.playerImage = p.loadImage("/res/spaceship.png");
    };

    p.setup = () => {
      p.imageMode(p.CENTER);
      const height = p.windowHeight;
      const width = p.windowWidth;
      const canvas = p.createCanvas(width, height);
      canvas.parent("game-rngeddon");
      p.stroke(255);
      p.frameRate(this.framesPerSecond);
      p.noCursor();

      this.player = new Player(width * height, this.playerImage);
      this.meteors = [];
      this.markers = [];
      this.stars = [];
      this.impacts = [];
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
      p.background(0);
      this.earth.draw(p);
      this.player.draw(p);

      this.stars.forEach((star) => star.draw(p));

      const shouldSpawnMeteor = p.frameCount % (this.framesPerSecond / this.meteorsPerSecond) === 0;
      if (shouldSpawnMeteor) {
        const randomAngle = this.meteorAngleProbability.getNumber();
        const randomAngleDegree = Math.floor(randomAngle * (180 / Math.PI));

        let new_meteor = new Meteor(
          { angle: randomAngle },
          p.width,
          p.height,
          this.earthSize,
          this.player.playersize,
          this.meteorImage
        );
        this.meteors.push(new_meteor);
        this.markers.push(new Marker(new_meteor.posX, new_meteor.posY));
      }

      this.meteors.forEach((meteor) => {
        if (meteor.stateImpact) {
          this.removeMeteor(meteor);
          this.impacts.push(new Impact(meteor.posX, meteor.posY, meteor.meteorSize * 4, this.explosionImage));
        }
        if (meteor.stateEaten) {
          this.addToScore(1);
          this.removeMeteor(meteor);
          this.stars.push(new Star(meteor.posX, meteor.posY));
        }

        meteor.draw(p);
      });

      this.markers.forEach((marker) => {
        marker.draw(p);
      });

      this.impacts.forEach((impact) => {
        if (impact.stateFinished) {
          let idx = this.impacts.indexOf(impact);
          this.impacts.splice(idx, 1);
          return;
        }

        impact.draw(p);
      });
    };
  };

  public game(): (p: p5) => void {
    return this.sketch;
  }
}
