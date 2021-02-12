import p5 from "p5";
import { Distribution } from "./distributions/distribution";
import { ExponentialDistribution } from "./distributions/exponential";
import { Earth } from "./models/earth";
import { Impact } from "./models/impact";
import { Meteor, Meteorlist } from "./models/meteor";
import { Marker, Markerlist } from "./models/marker";
import { Player } from "./models/player";
import { Star } from "./models/star";
import $ from "jquery";
import { GameControllerInterface } from "./gamecontroller_interface";
import Plotly from "plotly.js";
import { NormalDistribution } from "./distributions/normal";
import { UniformDistribution } from "./distributions/uniform";

export class RNGeddonController implements GameControllerInterface {
  constructor() {
	$(() => {
		this.plotDistribution(this.angleData);
	})
    $("#plot-button").click(() => {
      this.plotDistribution(this.angleData);
    });

    const mpsLabel = $(".meteorsPerSecond-label");
    mpsLabel.text(this.meteorsPerSecond);

    const self = this;
    $("#meteorsPerSecond").on("input", (event) => {
      const value = (<HTMLInputElement>event.target).value;
      self.meteorsPerSecond = +value;
      mpsLabel.text(self.meteorsPerSecond);
    });

    $("#meteorAngleDistribution").on("input", (event) => {
      const value = (<HTMLInputElement>event.target).value;
      self.switchMeteorAngleDistribution(value);
    });
  }
  private earthSize = 256;
  private markersize = 20;

  private meteorsPerSecond = 5;
  private framesPerSecond = 60;

  private earth = new Earth(this.earthSize);
  private player: Player;

  private meteors: Meteorlist;
  private markers: Markerlist;
  private markercolor: p5.Color;

  private explosionImage: p5.Image;
  private meteorImage: p5.Image;
  private playerImage: p5.Image;

  private angleData: number[] = [];

  private randomNumberGenerator = Math.random;
  private meteorAngleProbability: Distribution = new NormalDistribution(
    this.randomNumberGenerator,
    Math.PI,
    Math.PI / 2
  );

  private switchMeteorAngleDistribution(distribution: string) {
    switch (distribution) {
      case "uniform":
        this.meteorAngleProbability = new UniformDistribution(this.randomNumberGenerator, 0, Math.PI * 2);
        break;
      case "normal":
        this.meteorAngleProbability = new NormalDistribution(this.randomNumberGenerator, Math.PI, Math.PI / 2);
        break;
    }
    this.angleData = [];
    this.markers = new Markerlist(this.markercolor);
  }

  private updateScore() {
    $(".score").text(this.meteors.meteorseaten);
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
      const shouldSpawnMeteor = p.frameCount % (this.framesPerSecond / this.meteorsPerSecond) === 0;
      if (shouldSpawnMeteor) {
        const randomAngle = this.meteorAngleProbability.random();
        const randomAngleDegree = Math.floor(randomAngle * (180 / Math.PI));

        this.angleData.push(randomAngleDegree);

        let new_meteor = new Meteor(
          { angle: randomAngle },
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

      this.updateScore();
    };
  };

  private async plotDistribution(angleData: number[]) {
    const data: Plotly.Data[] = [
      {
        x: angleData,
        type: "histogram",
      },
    ];

    const config: Partial<Plotly.Config> = {
      scrollZoom: false,
      displayModeBar: false,
    };

    const layout = {
      title: "Distribution",
      showlegend: false,
      margin: {
        t: 40,
        b: 40,
      },
      xaxis: {
        title: {
          text: "Degrees",
          font: {
            family: "Courier New, monospace",
            size: 18,
            color: "#fff",
          },
        },
      },
      yaxis: {
        title: {
          text: "Count",
          font: {
            family: "Courier New, monospace",
            size: 18,
            color: "#fff",
          },
        },
      },
    };

    Plotly.newPlot("prob-diagram", data, layout, config);
  }

  public game(): (p: p5) => void {
    return this.sketch;
  }
}
