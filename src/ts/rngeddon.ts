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
import Plotly from 'plotly.js';

export class RNGeddonController implements GameControllerInterface {
  private meteorsPerSecond = 5;
  private framesPerSecond = 60;

  private earthSize = 256;
  private earth = new Earth(this.earthSize);
  private player: Player;
  
  private meteors: Meteor[];
  private markers: Marker[];
  private stars: Star[];
  private impacts: Impact[];

  private explosionImage: p5.Image
  private meteorImage: p5.Image

  private score: number = 0;

  private testProbability: Distribution = new ExponentialDistribution(Math.random, 1);

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

	  this.player = new Player(width*height);
	  this.meteors = [];
	  this.markers = [];
	  this.stars = [];
	  this.impacts = [];

	  const layout = {
		title: 'Distribution',
		showlegend: false
	};

	  const data: Plotly.Data[] = [
		{
		  x: ['giraffes', 'orangutans', 'monkeys'],
		  y: [20, 14, 23],
		  type: 'bar'
		}
	  ];

	  const config: Partial<Plotly.Config> = {
		  scrollZoom: false,
		  displayModeBar: false
	  }
	  
	  Plotly.newPlot('prob-diagram', data, layout, config);
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
		let new_meteor = new Meteor({}, p.width, p.height, this.earthSize, this.player.playersize, this.meteorImage)
		this.meteors.push(new_meteor);
		this.markers.push(new Marker(new_meteor.posX, new_meteor.posY));
	  }

	  this.meteors.forEach((meteor) => {
		if (meteor.stateImpact) {
		  this.removeMeteor(meteor);
		  this.impacts.push(
			new Impact(meteor.posX, meteor.posY, meteor.meteorSize * 4, this.explosionImage)
		  );
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

	  console.log(this.testProbability.random());
	};
  };

  public game(): (p: p5) => void {
	return this.sketch;
  }
}
