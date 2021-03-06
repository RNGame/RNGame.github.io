import p5 from "p5";
import { Earth } from "./models/earth";
import { Meteor, Meteorlist } from "./models/meteor";
import { Marker, Markerlist } from "./models/marker";
import { Player } from "./models/player";
import $ from "jquery";
import { GameControllerInterface } from "./gamecontroller_interface";
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

    $("#sim-switch").on("input", () => {
      this.isSimulation = !this.isSimulation;
    });

    $(".reset").click(() => {
      this.reset();
    });

    $("#start-game").click(() => {
      $("#start-game").hide();
      $("#pause-game").show();
      $("#end-game").show();
      this.gameinstance.loop()
    });
    $("#pause-game").click(() => {
      $("#pause-game").hide();
      $("#start-game").show();
      $("#end-game").show();
      this.gameinstance.noLoop();
    });

    $("#end-game").click(() => {
      this.endGame();
    });
  }

  private gameinstance: p5;
  private earthSize = 256;
  private markersize = 20;

  private maxEarthLife = 100;
  private life = 100;
  private isSimulation = false;

  private meteorsPerSecond = 5;
  private framesPerSecond = 60;
  private secondsPerPlot = 1;

  private earth = new Earth(this.earthSize);
  private player: Player;

  private meteors: Meteorlist;
  private markers: Markerlist;
  private markercolor: p5.Color;

  private explosionImage: p5.Image;
  private meteorImage: p5.Image;
  private playerImage: p5.Image;

  private meteorAngleProbability: RandomNumberGenerator = new RandomNumberGenerator(
    "meteorAngleContainer",
    "Meteor Angle",
    "Degrees",
    "Count",
    {
      mean: new SliderInput(0, Math.PI * 2, Math.PI, "Mean", "meteorAngleContainer", 0.01),
      sd: new SliderInput(0, Math.PI, Math.PI / 2, "Standard deviation", "meteorAngleContainer", 0.01),
      min: new StaticInput(0),
      max: new StaticInput(2 * Math.PI),
      lambda: new SliderInput(-2, 2, 1, "Lambda", "meteorAngleContainer", 0.1),
    },
    "uniform",
    true,
    (newDist: string) => {
      this.markers = new Markerlist(this.markercolor);
    }
  );

  private meteorSpeedProbability: RandomNumberGenerator = new RandomNumberGenerator(
    "meteorSpeedContainer",
    "Meteor Speed",
    "Speed value(lower is faster)",
    "Count",
    {
      mean: new SliderInput(10, 10000, 1000, "Mean", "meteorSpeedContainer", 1),
      sd: new SliderInput(10, 10000, 100, "Standard deviation", "meteorSpeedContainer", 1),
      min: new SliderInput(10, 10000, 1000, "Minimum speed", "meteorSpeedContainer", 1),
      max: new SliderInput(10, 10000, 2000, "Maximum speed", "meteorSpeedContainer", 1),
      lambda: new SliderInput(-2, 2, 1, "Lambda", "meteorSpeedContainer", 0.1),
    },
    "normal",
    false
  );

  private updateScore() {
    $(".score").text(this.meteors.meteorseaten);
  }

  private updateLife() {
    $(".game-life").text(Number(this.life.toFixed(1)) + "%");
  }

  private endGame() {
    $("#end-game").hide();
    $("#pause-game").hide();
    $("#start-game").show();
    this.gameinstance.noLoop()
    this.meteors = new Meteorlist(this.explosionImage);
    this.markers = new Markerlist(this.markercolor);
  }

  private reset() {
    this.meteorAngleProbability.reset();
    this.meteorSpeedProbability.reset();
    this.meteors = new Meteorlist(this.explosionImage);
    this.markers = new Markerlist(this.markercolor);
    this.gameinstance.redraw();
  }

  private sketch = (p: p5) => {
    p.preload = () => {
      this.earth.earthImage = p.loadImage("/res/earth.png");
      this.explosionImage = p.loadImage("/res/explosion.png");
      this.meteorImage = p.loadImage("/res/meteor.gif");
      this.playerImage = p.loadImage("/res/spaceship.png");
    };

    p.setup = () => {
      this.gameinstance = p;
      p.noLoop();
      p.imageMode(p.CENTER);
      const height = p.windowHeight;
      const width = p.windowWidth;
      const canvas = p.createCanvas(width, height);
      canvas.parent("game-rngeddon");
      p.stroke(255);
      p.frameRate(this.framesPerSecond);
      p.noCursor();

      this.player = new Player(width * height, this.playerImage);
      this.meteors = new Meteorlist(this.explosionImage);
      this.markercolor = p.color(66, 239, 245);
      this.markers = new Markerlist(this.markercolor);
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.draw = () => {
      p.background(0);
      this.earth.draw(p);

      this.player.draw(p);

      //add new meteor (and marker)
      const shouldSpawnMeteor = p.frameCount % Math.floor(this.framesPerSecond / this.meteorsPerSecond) === 0;

      if (shouldSpawnMeteor) {
        const randomAngle = this.meteorAngleProbability.getNumber();
        const randomSpeed = this.meteorSpeedProbability.getNumber();

        let new_meteor = new Meteor(
          { angle: randomAngle, speed: randomSpeed },
          p.width,
          p.height,
          this.earthSize,
          this.player.playersize,
          this.meteorImage
        );
        this.meteors.push(new_meteor);
        this.markers.push(new Marker(new_meteor.posX, new_meteor.posY, this.markersize, new_meteor.direction));
      }

      //draw markers
      this.markers.draw(p);

      //draw meteors
      this.meteors.draw(p);

      //plot new data
      if(p.frameCount % (this.framesPerSecond * this.secondsPerPlot) === 0){
        this.meteorAngleProbability.plotDistribution(this.meteorAngleProbability.data);
        this.meteorSpeedProbability.plotDistribution(this.meteorSpeedProbability.data);
      }

      if (this.isSimulation) {
        return;
      }

      //update score
      this.updateScore();

      this.life = ((this.maxEarthLife - this.meteors.meteorsImpacted) / this.maxEarthLife) * 100;

      if (this.life <= 0) {
        $(".game-life").text("GAME OVER");
        this.endGame();
        return;
      }
      
      this.updateLife();
    };
  };

  public game(): (p: p5) => void {
    return this.sketch;
  }
}
