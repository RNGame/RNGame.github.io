import p5 from "p5";
import { Distribution } from "./distributions/distribution";
import { ExponentialDistribution } from "./distributions/exponential";
import { Earth } from "./models/earth";
import { Impact } from "./models/impact";
import { Meteor } from "./models/meteor";
import { Player } from "./models/player";
import { Star } from "./models/star";
import $ from "jquery";

export class RNGeddonController {
  private oldAngle: number;
  private gamesize = 800;

  private earthSize = 256;

  private meteorsPerSecond = 60;
  private framesPerSecond = 60;

  private earth = new Earth(this.earthSize);
  private player: Player;
  private meteors: Meteor[];
  private stars: Star[];
  private impacts: Impact[];

  private eckangle: number;

  private score: number = 0;

  private uniformProb: Distribution = new ExponentialDistribution(
	Math.random,
	1
  );

  /*
let sound_nom: p5.SoundFile;
let sound_oof: p5.SoundFile; 
*/

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
	  /*
	  sound_nom = new p5.SoundFile("/res/nom.mp3");
	  sound_oof = new p5.SoundFile("/res/oof.mp3");
	  */
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

	  this.player = new Player(this.gamesize);
	  this.meteors = [];
	  this.stars = [];
	  this.impacts = [];

	  this.eckangle = p.atan2(height, width);
	};

	p.windowResized = () => {
	  p.resizeCanvas(p.windowWidth, p.windowHeight);
	};

	p.draw = () => {
	  p.background(0);
	  this.earth.draw(p);
	  this.player.draw(p);

	  this.stars.forEach((star) => star.draw(p));

	  const shouldSpawnMeteor =
		p.frameCount % (this.framesPerSecond / this.meteorsPerSecond) === 0;
	  if (shouldSpawnMeteor) {
		this.meteors.push(
		  new Meteor(
			p.windowWidth + 400,
			p.random(p.PI * 2),
			p.width,
			p.height,
			this.earthSize,
			50
		  )
		);
	  }

	  this.meteors.forEach((meteor) => {
		if (meteor.stateImpact) {
		  this.removeMeteor(meteor);
		  this.impacts.push(
			new Impact(meteor.posX, meteor.posY, meteor.meteorSize * 2)
		  );
		}
		if (meteor.stateEaten) {
		  this.addToScore(1);
		  this.removeMeteor(meteor);
		  this.stars.push(new Star(meteor.posX, meteor.posY));
		}

		meteor.draw(p);
	  });

	  this.impacts.forEach((impact) => {
		if (impact.stateFinished) {
		  let idx = this.impacts.indexOf(impact);
		  this.impacts.splice(idx, 1);
		  return;
		}

		impact.draw(p);
	  });

	  console.log(this.uniformProb.random());
	};
  };

  public game(): (p: p5) => void {
	return this.sketch;
  }
}