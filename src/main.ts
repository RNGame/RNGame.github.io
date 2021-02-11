import p5 from "p5";
import { Distribution } from "./ts/distributions/distribution";
import { Earth } from "./ts/models/earth";
import { ExponentialDistribution } from "./ts/distributions/exponential";
import { Player } from "./ts/models/player";
import { Meteor } from "./ts/models/meteor";
import { Impact } from "./ts/models/impact";
import { Star } from "./ts/models/star";
import "./style/main.scss";
import $ from 'jquery';
import { RNGeddonController } from "./ts/rngeddon";

const rngeddon = new RNGeddonController()

if ($('#game-rngeddon').length) {
  new p5(rngeddon.game())
}
